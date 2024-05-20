using Backend.Application.DTO.Marker;
using Backend.Application.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace Backend.External.Services
{
    public class NotificationService: INotificationService
    {
        IDatabase database;
        IConfiguration configuration;
        
        public NotificationService(IDatabase database, IConfiguration configuration)
        {
            this.database = database;
            this.configuration = configuration;
        }

        public async Task SendEmail(MarkerPredictionDTO prediction)
        {
            var usersToSend = await database.Groups
                .AsNoTracking()
                .Include(x => x.Users)
                .ThenInclude(x => x.Role)
                .Where(x => x.PlaceId == prediction.placeId)
                .SelectMany(x => x.Users
                .Where(x => x.Role.Name == "Liquidator")).ToListAsync();

            foreach (var user in usersToSend)
            {
                await SendEmail(prediction.predictionLabel, prediction.probability, prediction.markerId, user.Email);
            }
        }

        private async Task SendEmail(string label, float probability, string guid, string userEmail)
        {
            using var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Оповещение", configuration["smtpConfiguration:smtpLogin"]));
            emailMessage.To.Add(new MailboxAddress(userEmail, userEmail));
            emailMessage.Subject = "Оповещение";
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = $"Маркер {guid} определен как {label} с вероятностью {probability}"
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(configuration["smtpConfiguration:smtpServer"], 587, false);
                await client.AuthenticateAsync(configuration["smtpConfiguration:smtpLogin"], configuration["smtpConfiguration:smtpPassword"]);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }

        }
    }
}
