using System.Data;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain
{
    public class Tag
    {
        [BsonId(IdGenerator = typeof(int))]
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string ColorCode { get; set; } = default!;
    }
}
