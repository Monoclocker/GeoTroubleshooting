using Backend.Models;
using Microsoft.AspNetCore.SignalR;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Hubs
{
    public class MapHub: Hub
    {
        readonly IMongoDatabase _mongo;
        readonly IConfiguration _configuration;

        public MapHub(MongoClient mongo, IConfiguration configuration) 
        { 
            _configuration = configuration;
            _mongo = mongo.GetDatabase(_configuration["Mongo:Database"]);
        }

        public async Task GetMarkers()
        {
            var markers = await _mongo.GetCollection<MapMarker>(_configuration["Mongo:MarkersCollection"])
                .Find(new BsonDocument())
                .ToListAsync();

            await Clients.Caller.SendAsync("InitMarkers", markers.Take(50));
        }

        public async Task AddMarker(MapMarker marker)
        {
            await _mongo.GetCollection<MapMarker>(_configuration["Mongo:MarkersCollection"])
                .InsertOneAsync(marker);

            await Clients.AllExcept(Context.ConnectionId).SendAsync("NewMarker", marker);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

    }
}
