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
            var collection = mongo.GetCollection<Marker>(configuration["Mongo:MarkerCollection"]);

            var markers = await collection.FindAsync(x => x.TimeStamp < dto.endTimestamp && x.TimeStamp >= dto.startTimestamp);

            var markersList = await markers.ToListAsync();

            List<MarkerInfoDTO> dtoList = new List<MarkerInfoDTO>();

            foreach (var marker in markersList)
            {
                MarkerInfoDTO markerInfo = new MarkerInfoDTO()
                {
                    id = marker.Id.ToString(),
                    name = marker.Name,
                    coordinates = marker.Coordinates,
                    timestamp = marker.TimeStamp,
                    attachments = marker.Attachments,
                    tags = marker.Tags.ToArray(),
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
            var collection = mongo.GetCollection<Marker>("MarkerCollection");

            Marker newMarker = new Marker()
            {
                Id = new Guid(),
                Name = dto.name,
                TimeStamp = DateTime.UtcNow,
                Description = dto.description,
                Attachments = dto.attachments.ToList(),
                Tags = dto.tags.ToList(),
                Coordinates = dto.coordinates,
                PlaceId = dto.placeId,
            };

            User user = await database.Users.FirstAsync(x => x.Username == dto.username);

            newMarker.UserId = user.Id;

            await collection.InsertOneAsync(newMarker);

            MarkerInfoDTO info = (MarkerInfoDTO)dto;

            info.id = newMarker.Id.ToString();
            info.timestamp = newMarker.TimeStamp;

            return info;
        }
        public async Task<bool> UpdateMarkerAsync(MarkerInfoDTO dto)
        {
            var collection = mongo.GetCollection<Marker>("MarkerCollection");

            Marker marker = await collection.FindOneAndUpdateAsync(x => x.Id == Guid.Parse(dto.id), 
                new BsonDocument("$set", 
                    new BsonDocument { 
                        { "Description", dto.description },
                        { "Tags", new BsonArray(dto.tags) }
                    }));

            return true;
        }

        public async Task<bool> RemoveMarkersAsync(Guid id) 
        {
            var collection = mongo.GetCollection<Marker>("MarkerCollection");

            await collection.FindOneAndDeleteAsync(x => x.Id == id);

            return true;
        }

    }
}
