using Backend.Application.DTO;
using Backend.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.Interfaces
{
    public interface IUserService
    {
        public bool TryLogin(UserLoginDTO dto);
        public UserInfoDTO GetUserInfo(UserLoginDTO dto);
        public bool AddUser(UserRegistrationDTO dto);
        public bool UpdateUser(User user);
        public bool DeleteUser(User user);
    }
}
