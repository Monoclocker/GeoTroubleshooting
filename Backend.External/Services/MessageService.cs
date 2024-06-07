using Backend.Application.DTO.Message;
using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Backend.External.Services
{
    public class MessageService : IMessageService
    {
        IMongoDatabase mongo;
        IDatabase database;
        IConfiguration configuration;
        public MessageService(IMongoDatabase mongo, IConfiguration configuration, IDatabase database)
        {
            this.mongo = mongo;
            this.database = database;
            this.configuration = configuration;
        }

        public async Task<MessageDTO?> CreateMessage(MessageDTO messageDTO)
        {
            User? user = await database.Users.Include(x=>x.Groups).FirstOrDefaultAsync(x => x.Username == messageDTO.username);

            if(user == null)
            {
                return null;
            }

            if(user.Groups.FirstOrDefault(x=>x.Id == messageDTO.groupId) == null)
            {
                return null;
            }

            Group? group = await database.Groups.FirstOrDefaultAsync(x => x.Id == messageDTO.groupId);

            if(group == null)
            {
                return null;
            }

            var collection = mongo.GetCollection<Message>(configuration["Mongo:MessageCollection"]);

            Message newMessage = new Message()
            {
                Id = new Guid(),
                Text = messageDTO.message,
                Timestamp = DateTime.Now,
                Attachments = messageDTO.attachments,
                UserId = user.Id,
                GroupId = (int)messageDTO.groupId!
            };

            await collection.InsertOneAsync(newMessage);

            messageDTO.timestamp = newMessage.Timestamp;
            messageDTO.id = newMessage.Id.ToString();
            return messageDTO;

        }
        public async Task<MessageDTO[]> GetMessages(int groupId, int? count)
        {
            var collection = mongo.GetCollection<Message>(configuration["Mongo:MessageCollection"]);

            var builder = Builders<Message>.Filter;

            FilterDefinition<Message> filter = builder.Where(x=>x.GroupId == groupId);

            var messagesCursor = await collection.FindAsync(filter);

            List<Message> messages = await messagesCursor.ToListAsync();

            List<MessageDTO> result = new List<MessageDTO>();

            foreach(var message in messages.OrderByDescending(x=>x.Timestamp)
                .Take((int)count!))
            {
                User user = await database.Users.FirstAsync(x => x.Id == message.UserId);

                MessageDTO dto = new MessageDTO()
                {
                    attachments = message.Attachments,
                    message = message.Text,
                    id = message.Id.ToString(),
                    timestamp = message.Timestamp,
                    username = user.Username,
                };

                result.Add(dto);
            }

            return result.ToArray();
        }
    }
}
