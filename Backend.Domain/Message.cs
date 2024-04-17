using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Domain
{
    public class Message
    {
        [BsonId(IdGenerator = typeof(int))]
        public int Id { get; set; }
        public string Content { get; set; } = default!;
        public int SenderId { get; set; }
        public int GroupId { get; set; }
        public List<string> Attachements { get; set; } = new List<string>();
    }
}
