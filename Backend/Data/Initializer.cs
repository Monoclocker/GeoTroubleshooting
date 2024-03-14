using Backend.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.Data
{
    public class Initializer
    {

        public async static Task Initialize(
            ConfigurationManager _configuration,
            RoleManager<IdentityRole<int>> _roleManager,
            UserManager<User> _userManager,
            MongoClient _mongo)
        {
            if (await _roleManager.FindByNameAsync("admin") is null)
            {
                await _roleManager.CreateAsync(new IdentityRole<int>() { Name = "admin"});
            }
            if (await _roleManager.FindByNameAsync("user") is null)
            {
                await _roleManager.CreateAsync(new IdentityRole<int>() { Name = "user" });
            }
            if (await _userManager.FindByNameAsync(_configuration["AdminCredentials:Username"]!) is null)
            {
                User adminUser = new User()
                { UserName = _configuration["AdminCredentials:Username"]!, 
                    Email = _configuration["AdminCredentials:Email"]! };

                IdentityResult registrationResult = await _userManager.CreateAsync(adminUser,
                _configuration["AdminCredentials:Password"]!);

                if (registrationResult.Succeeded)
                {
                    await _userManager.AddToRoleAsync(adminUser, "admin");
                }

            }

            var db = _mongo.GetDatabase(_configuration["Mongo:Database"]);

            if (db.GetCollection<BsonDocument>(_configuration["Mongo:MarkersCollection"]) is null)
            {
                await db.CreateCollectionAsync(_configuration["Mongo:MarkersCollection"]);
            }

            if (db.GetCollection<BsonDocument>(_configuration["Mongo:ChatCollection"]) is null)
            {
                await db.CreateCollectionAsync(_configuration["Mongo:ChatCollection"]);
            }

        }


    }
}
