using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.External.Services
{
    public class MapMarkerService : IMapMarkerService
    {
        IMongoDatabase mongo;
        IDatabase database;
        IConfiguration configuration;
        IPredictionService predictionService;
        INotificationService emailService;
        public MapMarkerService(IMongoDatabase mongo, IConfiguration configuration, IDatabase database,
            IPredictionService predictionService, INotificationService emailService)
        {
            this.mongo = mongo;
            this.configuration = configuration;
            this.database = database;
            this.predictionService = predictionService;
            this.emailService = emailService;
        }

        public async Task<List<MarkerInfoDTO>> GetMarkersAsync(MarkersGetDTO dto)
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            var builder = Builders<Marker>.Filter;

            FilterDefinition<Marker> filter;

            if(dto.markerId == null)
            {
                filter = builder.Where(x => x.TimeStamp <= dto.endTimestamp && x.TimeStamp >= dto.startTimestamp && x.PlaceId == dto.placeId);
            }

            else
            {
                filter = builder.Where(x => x.TimeStamp <= dto.endTimestamp && x.TimeStamp >= dto.startTimestamp && x.PlaceId == dto.placeId && x.Id.ToString().Contains(dto.markerId));
            }

            var markers = await collection.Find(filter).ToListAsync();

            Console.WriteLine(markers.Count);

            List<MarkerInfoDTO> dtoList = new List<MarkerInfoDTO>();

            foreach (var marker in markers)
            {
                MarkerInfoDTO markerInfo = new MarkerInfoDTO()
                {
                    id = marker.Id.ToString(),
                    name = marker.Name,
                    coordinates = marker.Coordinates.ToList(),
                    timestamp = marker.TimeStamp,
                    attachments = marker.Attachments,
                    description = marker.Description,
                    label = marker.Label,
                    placeId = marker.PlaceId,
                    
                };

                User user = await database.Users.FirstAsync(x => x.Id == marker.UserId);

                markerInfo.username = user.Username;

                dtoList.Add(markerInfo);
            }

            return dtoList;
        }

        public async Task<MarkerInfoDTO> AddMarkerAsync(MarkerCreateDTO dto)
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            List<string> imagePath = new List<string>();

            foreach (Attachment attachment in dto.attachments)
            {
                string type = attachment.Type.Split('/')[0];
                if (type.ToLower() == "image")
                {
                    imagePath.Add(Path.Combine(configuration["fileStorage"]!,attachment.Path));
                }
            }

            var predictionResult = await predictionService.Predict(imagePath);

            Marker newMarker = new Marker()
            {
                Id = Guid.NewGuid(),
                Name = dto.name,
                TimeStamp = DateTime.UtcNow,
                Description = dto.description,
                Attachments = dto.attachments.ToList(),
                Coordinates = dto.coordinates.ToArray(),
                PlaceId = dto.placeId,
                Label = predictionResult.Item1
            };

            if (predictionResult.Item3)
            {
                await emailService.SendEmail(new MarkerPredictionDTO() { markerId = newMarker.Id.ToString(), 
                    predictionLabel = predictionResult.Item1, probability = predictionResult.Item2, 
                    placeId = newMarker.PlaceId });
            }

            User user = await database.Users.FirstAsync(x => x.Username == dto.username);

            newMarker.UserId = user.Id;

            await collection.InsertOneAsync(newMarker);

            MarkerInfoDTO info = new MarkerInfoDTO()
            {
                attachments = dto.attachments.ToList(),
                coordinates = dto.coordinates,
                description = dto.description,
                id = newMarker.Id.ToString(),
                name = dto.name,
                placeId = dto.placeId,
                timestamp = newMarker.TimeStamp,
                username = dto.username,
                label = predictionResult.Item1
            };

            return info;
        }
        public async Task<bool> UpdateMarkerAsync(MarkerInfoDTO dto)
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            Marker marker = await collection.FindOneAndUpdateAsync(x => x.Id == Guid.Parse(dto.id), 
                new BsonDocument("$set", 
                    new BsonDocument { 
                        { "Description", dto.description }
                    }));

            return true;
        }

        public async Task<bool> RemoveMarkersAsync(Guid id) 
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            await collection.FindOneAndDeleteAsync(x => x.Id == id);

            return true;
        }

    }
}
