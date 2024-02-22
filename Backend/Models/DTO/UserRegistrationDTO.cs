namespace Backend.Models.DTO
{
    public class UserRegistrationDTO
    {
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
