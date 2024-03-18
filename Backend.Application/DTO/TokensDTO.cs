namespace Backend.Application.DTO
{
    public class TokensDTO
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
