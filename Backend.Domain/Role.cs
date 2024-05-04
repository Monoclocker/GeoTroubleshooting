using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;

        // 1:N to Users
        public List<User> Users { get; set; } = default!;
    }
}
