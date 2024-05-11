using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Groups
{
    public class GroupUser
    {
        public string username { get; set; } = default!;
        public bool isAdmin { get; set; }
    }
}
