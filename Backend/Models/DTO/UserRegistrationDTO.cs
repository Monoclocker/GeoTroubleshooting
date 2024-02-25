using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public class UserRegistrationDTO
    {
        [Required]
        public string Username { get; set; } = default!;
        [Required]
        public string Email { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;
    }
}
