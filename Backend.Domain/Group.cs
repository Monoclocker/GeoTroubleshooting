using System.ComponentModel.DataAnnotations;

namespace Backend.Domain
{
    public class Group
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        
        public string? Description { get; set; }

        // N:N to Users using GroupUsers
        public List<User> Users { get; set; } = new List<User>();
        public List<GroupUsers> GroupUsers { get; set; } = new List<GroupUsers>();
        
        // 1:1 to Place
        public Place Place { get; set; } = default!;
        public int PlaceId { get; set; }


    }
}
