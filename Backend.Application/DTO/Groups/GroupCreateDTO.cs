using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Application.DTO.Groups
{
    public class GroupCreateDTO
    {
        public string name { get; set; } = default!;
        public string? description { get; set; }
        public int placeId { get; set; }
        public string username { get; set; } = default!;
    }
}
