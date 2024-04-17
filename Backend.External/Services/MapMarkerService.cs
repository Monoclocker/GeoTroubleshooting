using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Tag = Backend.Domain.Tag;

namespace Backend.External.Services
{
    public class MapMarkerService : IMapMarkerService
    {
        readonly IConfiguration configuration;
        readonly IMongoDatabase mongo;

        public MapMarkerService(IConfiguration _configuration, MongoClient _client)
        {
            configuration = _configuration;
            mongo = _client.GetDatabase(configuration["Mongo:Database"]);
        }


        public async Task<IEnumerable<MarkerDTO>> GetMarkersAsync()
        {
            IMongoQueryable<MapMarker> query = mongo.GetCollection<MapMarker>("Markers").AsQueryable();

            List<MarkerDTO> markers = new List<MarkerDTO>();

            foreach (MapMarker element in query)
            {
                MarkerDTO marker = new MarkerDTO()
                {
                    coordinates = element.coordinates,
                    description = element.description,
                    photos = element.photos,
                    timestamp = element.creationDate,
                    title = element.title,
                    userName = element.userName
                };

                foreach (string tag in element.tagName)
                {
                    IAsyncCursor<Tag> tagsCursor = await mongo.GetCollection<Tag>("Tags").FindAsync(_tag => _tag.Name == tag);

                    IEnumerable<Tag> tags = tagsCursor.ToEnumerable();

                    marker.tags.AddRange(tags);
                }

                markers.Add(marker);
            }

            return markers;

        }
        public async Task AddMarkerAsync(MarkerDTO dto)
        {
            IMongoCollection<MapMarker> collection = mongo.GetCollection<MapMarker>("Markers");

            MapMarker newMarker = new MapMarker()
            {
                coordinates = dto.coordinates,
                description = dto.description,
                photos = dto.photos,
                creationDate = dto.timestamp,
                title = dto.title,
                userName = dto.userName
            };

            foreach (Tag tag in dto.tags)
            {
                newMarker.tagName.Add(tag.Name);
            }

            await collection.InsertOneAsync(newMarker);
        }
        public async Task UpdateMarkerAsync(MarkerDTO dto)
        {
            IMongoCollection<MapMarker> collection = mongo.GetCollection<MapMarker>("Markers");

            await collection.FindOneAndUpdateAsync(marker => marker.creationDate == dto.timestamp && marker.userName == dto.userName,
                new BsonDocument("$set", 
                    new BsonDocument { { "title", dto.title }, { "description", dto.description } }));

        }

        public async Task RemoveMarkersAsync(MarkerDTO dto)
        {
            IMongoCollection<MapMarker> collection = mongo.GetCollection<MapMarker>("Markers");

            await collection.FindOneAndDeleteAsync(marker => marker.creationDate == dto.timestamp && marker.userName == dto.userName);
        }

    }
}
