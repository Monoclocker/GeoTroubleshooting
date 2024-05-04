using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Auth
{
    public class EmailTokenDTO
    {
        public string? username { get; set; }
        public string? token { get; set; }
        public string? email { get; set; }
    }
}
