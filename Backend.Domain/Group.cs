using System.ComponentModel.DataAnnotations;

namespace Backend.Domain
{
    public class Group
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        
        public string? Description { get; set; }

        public List<User> Users { get; set; } = default!;
        public List<GroupRole> GroupRoles { get; set; } = default!;

    }
}
