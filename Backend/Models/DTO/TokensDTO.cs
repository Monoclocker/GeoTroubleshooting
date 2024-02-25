namespace Backend.Models.DTO
{
    public class TokensDTO
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
