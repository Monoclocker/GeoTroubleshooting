using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTO.Message
{
    public class MessageCreateDTO
    {
        [Required]
        public string Content { get; set; } = default!;
        [Required]
        public int SenderId { get; set; }
        public List<string> Attachements { get; set; } = new List<string>();
    }
}
