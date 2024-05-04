using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class GroupUsers
    {
        public int UsertId { get; set; }
        public int GroupId { get; set; }

        public User User { get; set; } = default!;
        public Group Group { get; set; } = default!;
    }
}
