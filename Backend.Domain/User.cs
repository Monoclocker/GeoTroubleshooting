using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Backend.Domain
{
    public class User: IdentityUser<int>
    {
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string? MiddleName { get; set; }

        [DataType(DataType.Date)]
        public DateTime Birtdate { get; set; }
        public List<Group> Groups { get; set; } = default!;
        public List<GroupRole> GroupRoles { get; set; } = default!;
    }
}
