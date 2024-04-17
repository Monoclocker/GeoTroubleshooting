using System.ComponentModel.DataAnnotations;

namespace Backend.Domain
{

    public class GroupRole
    {

        [Key]
        public int Id { get; set; }
        public bool IsAdmin { get; set; }
        public int UsertId { get; set; }
        public int GroupId { get; set; }
        public User User { get; set; } = default!;
        public Group Group { get; set; } = default!;

    }
}
