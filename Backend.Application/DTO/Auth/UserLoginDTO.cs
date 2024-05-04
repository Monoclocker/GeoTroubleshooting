using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Auth
{
    public class UserLoginDTO
    {
        public string username { get; set; } = default!;
        public string password { get; set; } = default!;
    }
}
