using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTO.User
{
    public class UserPublicDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; } = default!;

        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string? MiddleName { get; set; }

        [DataType(DataType.Date)]
        public DateTime Birtdate { get; set; }
        public string Email { get; set; } = default!;
    }
}
