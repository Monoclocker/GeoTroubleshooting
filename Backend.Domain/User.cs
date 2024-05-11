using System.ComponentModel.DataAnnotations;

namespace Backend.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string FirstName { get; set; } = default!;
        public string LastName { get; set; } = default!;

        [DataType(DataType.Date)]
        public DateTime Birtdate { get; set; }

        public string Photo { get; set; } = default!;

        public bool IsEmailConfirmed { get; set; }
        
        // N:1 to Roles
        public int RoleId { get; set; }
        public Role Role { get; set; } = default!;

        // N:N to Groups using GroupUsers
        public List<Group> Groups { get; set; } = new List<Group>();
        public List<GroupUsers> GroupUsers { get; set; } = new List<GroupUsers>();

    }
}
