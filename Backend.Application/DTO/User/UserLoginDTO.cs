using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTO.User
{
    public class UserLoginDTO
    {
        [Required]
        public string Username { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;
    }
}
