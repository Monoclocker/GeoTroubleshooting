using Backend.Application.DTO.User;

namespace Backend.Application.Interfaces
{
    public interface IUserService
    {
        public Task<UserInfoDTO?> GetUserInfoAsync(string username);
        public Task<bool> UpdateUserAsync(UserInfoDTO dto);

        //public Task<bool> DeleteUserByUserName(int id);
        
    }
}
