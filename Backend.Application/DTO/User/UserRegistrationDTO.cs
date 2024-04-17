using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTO.User
{
    public class UserRegistrationDTO
    {
        [Required]
        public string Username { get; set; } = default!;
        [Required]
        public string Email { get; set; } = default!;
        [Required]
        public string Password { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string? MiddleName { get; set; }

        [DataType(DataType.Date)]
        public DateTime Birtdate { get; set; }
    }
}
