using Backend.Application.DTO.User;

namespace Backend.Application.DTO.Group
{
    public class GroupPublicDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public List<UserPublicDTO> Users { get; set; } = new List<UserPublicDTO>();
        public string? Description { get; set; }

    }
}
