using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTO
{
    public class UserLoginDTO
    {
        [Required]
        public string Username { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;
    }
}
