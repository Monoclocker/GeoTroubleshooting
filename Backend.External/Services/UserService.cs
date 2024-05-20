using Backend.Application.DTO.User;
using Backend.Application.Interfaces;
using Backend.Domain;
using Backend.External.Utils;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Services
{
    public class UserService: IUserService
    {
        IDatabase database;

        public UserService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<UserInfoDTO?> GetUserInfoAsync(string username)
        {

            User? user = await database
                .Users
                .Include(x=>x.Role)
                .FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return null;
            }

            UserInfoDTO userInfo = new UserInfoDTO()
            {
                username = username,
                role = user.Role.Name,
                birthdate = user.Birtdate,
                firstname = user.FirstName,
                surname = user.LastName,
                email = user.Email,
                photo = user.Photo
            };

            return userInfo;
        }

        public async Task<bool> UpdateUserAsync(UserUpdateDTO dto)
        {

            User? user = await database
                .Users
                .FirstOrDefaultAsync(x => x.Username == dto.username);

            if (user == null)
            {
                return false;
            }

            user.FirstName = dto.firstname;
            user.LastName = dto.surname;
            user.Birtdate = dto.birthdate;
            user.Email = dto.email;

            if (dto.photo != null)
            {
                user.Photo = dto.photo;
            }

            if (dto.newPassword != null)
            {
                user.Password = Hasher.ComputeHash(dto.newPassword);
            }

            database.Users.Update(user);

            await database.SaveChangesAsync();

            return true;
        }
    }
}
