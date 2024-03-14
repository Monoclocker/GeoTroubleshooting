using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models
{
    public class MapMarker
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string userName { get; set; } = default!;
        public string title { get; set; } = default!;
        public string? description { get; set; }
        public decimal[] coordinates { get; set; } = default!;
    }
}
