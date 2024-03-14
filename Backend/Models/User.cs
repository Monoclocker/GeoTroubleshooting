using Microsoft.AspNetCore.Identity;

namespace Backend.Models
{
    public class User: IdentityUser<int>
    {
        public ICollection<Group> Groups { get; set; } = default!;
    }
}
