namespace Backend.Application.DTO.Groups
{
    public class GroupInfoDTO
    {
        public int id { get; set; }
        public string name { get; set; } = default!;
        public string? description { get; set; }

        public List<GroupUser>? users { get; set; }

    }
}
