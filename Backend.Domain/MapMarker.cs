using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain
{
    public class MapMarker
    {
        [BsonId(IdGenerator = typeof(int))]
        public int Id { get; set; }
        public string userName { get; set; } = default!;
        public DateTime creationDate { get; set; }
        public string title { get; set; } = default!;
        public string? description { get; set; }
        public decimal[] coordinates { get; set; } = default!;
        public List<string> photos { get; set; } = new List<string>();
        public List<string> tagName { get; set; } = new List<string>();
    }
}
