using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Auth
{
    public class UserRegistrationDTO
    {
        public string username { get; set; } = default!;
        public string password { get; set; } = default!;
        public string firstName { get; set; } = default!;
        public string lastName { get; set; } = default!;
        public string email { get; set; } = default!;
        public DateTime birthdate {  get; set; }
        public int roleId { get; set; }
    }
}
