using Backend.Application.DTO.Utils;
using Backend.Application.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.External.Services
{
    public class UtilsService: IUtilsService
    {
        IDatabase database;

        public UtilsService(IDatabase database)
        {
            this.database = database;
        }

        public async Task<List<RolesDTO>> GetRoles()
        {
            var roles = await database.Roles.Where(x=>x.Name != "Admin").ToListAsync();

            var rolesList = new List<RolesDTO>();

            var rolesLazy = new Lazy<List<RolesDTO>>(rolesList);

            foreach (var role in roles)
            {
                RolesDTO dto = new RolesDTO() { id = role.Id, name=role.Name };
                rolesList.Add(dto);
            }

            return rolesLazy.Value;
        }

        public async Task<List<string>> GetUsernames(string input)
        {
            return await database.Users.Select(x => x.Username).Where(x=>x.Contains(input)).Take(10).ToListAsync(); 
        }
    }
}
