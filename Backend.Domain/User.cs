using Microsoft.AspNetCore.Identity;

namespace Backend.Domain
{
    public class User: IdentityUser<int>
    {
        public ICollection<Group> Groups { get; set; } = default!;
    }
}
