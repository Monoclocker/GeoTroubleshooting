namespace Backend.Application.DTO.Message
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public string Content { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public List<string> Attachements { get; set; } = new List<string>();
    }
}
