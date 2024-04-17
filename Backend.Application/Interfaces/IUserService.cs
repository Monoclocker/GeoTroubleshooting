using Backend.Application.DTO.Token;
using Backend.Application.DTO.User;
using System.Security.Claims;

namespace Backend.Application.Interfaces
{
    public interface IUserService
    {
        public Task<TokensDTO> TryLoginAsync(UserLoginDTO dto);
        public Task TryConfirmEmailAsync(string email, string token);
        public Task GenerateEmailConfirmation(UserPublicDTO dto);
        public Task<UserPublicDTO> GetUserInfoAsync(string username);
        public Task RegisterUserAsync(UserRegistrationDTO dto);
        public Task UpdateUserAsync(UserPublicDTO dto);
        public Task DeleteUserByIdAsync(int id);
        public Task<TokensDTO> RefreshTokensAsync(ClaimsPrincipal? claims);
    }
}
