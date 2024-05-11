using Backend.Application.DTO.Groups;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Services
{
    public class GroupService: IGroupService
    {
        IDatabase database;
        public GroupService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<List<GroupInfoDTO>?> GetGroupsAsync(string username, int placeId, int pageId)
        {
            List<GroupInfoDTO> groups = new List<GroupInfoDTO>();

            User? user = await database.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return null;
            }

            List<Group> dbGroups = await database.Groups
                .Include(x => x.GroupUsers)
                .ThenInclude(x=>x.User)
                .Where(x => x.PlaceId == placeId && x.GroupUsers.Any(u => u.UserId == user.Id))
                .Skip(pageId * 10)
                .Take(10)
                .ToListAsync();

            foreach (Group group in dbGroups)
            {
                GroupInfoDTO dto = new GroupInfoDTO()
                {
                    description = group.Description,
                    id = group.Id,
                    name = group.Name,
                    users = new List<GroupUser>()
                    
                };

                foreach(var _user in group.GroupUsers)
                {
                    dto.users.Add(new GroupUser { username = _user.User.Username, isAdmin = _user.IsAdmin});
                }

                groups.Add(dto);
            }

            return groups;
        }

        public async Task<bool> CreateGroupAsync(GroupCreateDTO dto)
        {
            Group newGroup = new Group()
            {
                Description = dto.description,
                Name = dto.name,
                PlaceId = dto.placeId,
                GroupUsers = new List<GroupUsers>()
                
            };

            User? user = await database.Users.FirstOrDefaultAsync(x => x.Username == dto.username);

            if (user == null)
            {
                return false;
            }

            newGroup.GroupUsers.Add(new GroupUsers() { IsAdmin = true, User = user });

            database.Groups.Add(newGroup);

            await database.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AddToGroup(string username, int groupId)
        {
            User? user = await database.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
            {
                return false;
            }

            Group? group = await database.Groups.Include(x=>x.Users).FirstOrDefaultAsync(x=>x.Id == groupId);

            if (group == null || group.Users.Any(x=>x.Username == username))
            {
                return false;
            }


            group.Users.Add(user);

            database.Groups.Update(group);

            await database.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RemoveFromGroup(string username, int groupId)
        {
            Group? group = await database.Groups.Include(x=>x.Users).FirstOrDefaultAsync(x => x.Id == groupId);

            Console.WriteLine(group is null);

            if (group == null)
            {
                return false;
            }

            User? user = group.Users.FirstOrDefault(x => x.Username == username);

            Console.WriteLine(user.Username);

            if (user == null)
            {
                return false;
            }

            group.Users.Remove(user);

            database.Groups.Update(group);

            await database.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteGroupAsyncById(int id)
        {
            Group? group = await database.Groups.FirstOrDefaultAsync(x => x.Id == id);

            if (group == null)
            {
                return false;
            }

            database.Groups.Remove(group);

            await database.SaveChangesAsync();

            return true;

        }
    }
}
