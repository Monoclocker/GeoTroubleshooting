using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Group
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string name { get; set; } = default!;

        public ICollection<User> Users { get; set; } = default!;

    }
}
