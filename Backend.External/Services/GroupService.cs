using Backend.Application.DTO.Group;
using Backend.Application.DTO.Message;
using Backend.Application.DTO.User;
using Backend.Application.Exceptions;
using Backend.Application.Interfaces;
using Backend.Domain;
using Backend.External.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;


namespace Backend.External.Services
{
    public class GroupService: IGroupService
    {
        readonly DatabaseContext context;
        readonly UserManager<User> userManager;
        readonly IMongoDatabase mongo;
        readonly IConfiguration configuration;

        public GroupService(DatabaseContext _context, UserManager<User> _userManager, MongoClient _mongo, IConfiguration _configuration)
        {
            context = _context;
            userManager = _userManager;
            configuration = _configuration;
            mongo = _mongo.GetDatabase(configuration["Mongo:Database"]); ;
        }

        public async Task<GroupPublicDTO> GetGroupAsync(int groupId)
        {
            Group? groupQuery = await context.Groups
                .AsNoTracking()
                .Include(group => group.Users)
                .FirstOrDefaultAsync(x=>x.Id == groupId);

            if (groupQuery is null)
            {
                throw new UnknownGroupException();
            }

            GroupPublicDTO group = new GroupPublicDTO()
            {
                Name = groupQuery.Name,
                Description = groupQuery.Description,
            };

            foreach (User user in groupQuery.Users)
            {
                UserPublicDTO userDTO = new UserPublicDTO()
                {
                    UserName = user.UserName!,
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    MiddleName = user.MiddleName
                };

                group.Users.Add(userDTO);
            }

            return group;
        }

        public async Task<List<GroupPublicDTO>> GetGroupsAsync(int userId)
        {
            List<Group> groupQuery = await context.Groups
                .AsNoTracking()
                .Include(group => group.Users)
                .Where(
                    group => group.Users.Any(user => user.Id == userId)
                )
                .ToListAsync();

            List<GroupPublicDTO> groupsList = new List<GroupPublicDTO>();

            foreach (Group group in groupQuery)
            {
                GroupPublicDTO dto = new GroupPublicDTO()
                {
                    Id = group.Id,
                    Name = group.Name
                };

                groupsList.Add(dto);
            }

            return groupsList;
        }

        public async Task CreateGroupAsync(GroupCreateDTO dto)
        {
            Group newGroup = new Group()
            {
                Name = dto.Name,
                Description = dto.Description
            };

            User? creator = await userManager.FindByNameAsync(dto.CreatorName);

            if (creator is null)
            {
                throw new UnknownUserException();
            }

            newGroup.GroupRoles.Add(new GroupRole()
            {
                Group = newGroup,
                IsAdmin = true,
                User = creator
            });

            context.Groups.Add(newGroup);

            await context.SaveChangesAsync();
        }

        public async Task UpdateGroupAsync(GroupPublicDTO dto)
        {
            Group? groupForUpdate = await context.Groups.FirstOrDefaultAsync(g => g.Id == dto.Id);

            if (groupForUpdate is null)
            {
                throw new UnknownGroupException();
            }

            groupForUpdate.Name = dto.Name;
            groupForUpdate.Description = dto.Description;
            
            await context.SaveChangesAsync();
        }

        public async Task DeleteGroupAsyncById(int id)
        {
            Group? groupForRemove = await context.Groups.FirstOrDefaultAsync(g => g.Id == id);

            if (groupForRemove is null)
            {
                throw new UnknownGroupException();
            }

            context.Groups.Remove(groupForRemove);

            await context.SaveChangesAsync();
        }

        public async Task<List<MessageDTO>> GetGroupMessagesAsync(int groupId, int startIndex)
        {
            IMongoCollection<Message> messagesCollection = mongo.GetCollection<Message>("Messages");

            IAsyncCursor<Message> messagesQuery = await messagesCollection.FindAsync(x => x.GroupId == groupId);

            IEnumerable<Message> messages = messagesQuery.ToEnumerable().Skip(50 * startIndex).Take(50);

            List<MessageDTO> messagesResult = new List<MessageDTO>();

            foreach(Message message in messages)
            {
                MessageDTO messageDTO = new MessageDTO()
                {
                    Id = message.Id,
                    Attachements = message.Attachements,
                    Content = message.Content
                };

                User user = (await userManager.FindByIdAsync(message.SenderId.ToString()))!;

                messageDTO.FirstName = user.FirstName;
                messageDTO.LastName = user.LastName;

                messagesResult.Add(messageDTO);
            }

            return messagesResult;
        }

        public async Task TrySendMessageAsync(int groupId, MessageCreateDTO dto)
        {
            IMongoCollection<Message> messagesCollection = mongo.GetCollection<Message>("Messages");

            Message newMessage = new Message()
            {
                GroupId = groupId,
                SenderId = dto.SenderId,
                Content = dto.Content,
                Attachements = dto.Attachements
            };

            await messagesCollection.InsertOneAsync(newMessage);
        }

        public async Task RemoveMessageAsyncById(int messageId)
        {
            IMongoCollection<Message> messagesCollection = mongo.GetCollection<Message>("Messages");

            await messagesCollection.FindOneAndDeleteAsync(x => x.Id == messageId);
        }

        public async Task AddUserToGroup(UserPublicDTO user, int groupId)
        {
            Group? group = await context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                throw new UnknownGroupException();
            }

            group.GroupRoles.Add(new GroupRole()
            {
                GroupId = groupId,
                IsAdmin = false,
                UsertId = user.Id
            });

            await context.SaveChangesAsync();

        }

        public async Task RemoveUserFromGroup(UserPublicDTO user, int groupId)
        {
            Group? group = await context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
            {
                throw new UnknownGroupException();
            }

            group.GroupRoles.RemoveAll(match => match.UsertId == user.Id);

            await context.SaveChangesAsync();
        }
    }
}
