namespace Backend.Application.DTO.Token
{
    public class TokensDTO
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
    }
}
