namespace Backend.Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public string Text { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public List<Attachment>? Attachments { get; set; }



    }
}
