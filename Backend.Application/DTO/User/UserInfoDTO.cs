using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.User
{
    public class UserInfoDTO
    {
        public string username { get; set; } = default!;
        public string email { get; set; } = default!;
        public string firstname { get; set; } = default!;
        public string surname { get; set; } = default!;
        public string photo {  get; set; } = default!;
        public string role { get; set; } = default!;
        public string? newPassword { get; set; }
        public DateTime birthdate { get; set; }
    }
}
