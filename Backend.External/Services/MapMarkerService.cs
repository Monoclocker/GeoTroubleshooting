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
        public MapMarkerService(IMongoDatabase mongo, IConfiguration configuration, IDatabase database)
        {
            this.mongo = mongo;
            this.configuration = configuration;
            this.database = database;
        }

        public async Task<List<MarkerInfoDTO>> GetMarkersAsync(MarkersGetDTO dto)
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            var builder = Builders<Marker>.Filter;
            var filter = builder.Where(x => x.TimeStamp <= dto.endTimestamp && x.TimeStamp >= dto.startTimestamp && x.PlaceId == dto.placeId);

            var markers = await collection.Find(filter).ToListAsync();;

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
                    //tags = marker.Tags.ToArray(),
                    description = marker.Description,
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

            Marker newMarker = new Marker()
            {
                Id = Guid.NewGuid(),
                Name = dto.name,
                TimeStamp = DateTime.UtcNow,
                Description = dto.description,
                Attachments = dto.attachments.ToList(),
                //Tags = dto.tags.ToList(),
                Coordinates = dto.coordinates.ToArray(),
                PlaceId = dto.placeId,
            };

            Console.WriteLine(newMarker.Id.ToString());

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
            };

            return info;
        }
        public async Task<bool> UpdateMarkerAsync(MarkerInfoDTO dto)
        {
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkersCollection"]);

            Marker marker = await collection.FindOneAndUpdateAsync(x => x.Id == Guid.Parse(dto.id), 
                new BsonDocument("$set", 
                    new BsonDocument { 
                        { "Description", dto.description },
                        //{ "Tags", new BsonArray(dto.tags) }
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
