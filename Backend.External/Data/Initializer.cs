using Backend.Application.Interfaces;
using Backend.Domain;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend.External.Data
{
    public class Initializer
    {
        public async static Task Initialize(
            IConfiguration configuration,
            MongoClient mongo,
            IDatabase database)
        {

            if (database.Roles.FirstOrDefault(x=>x.Name == "Admin") == null) 
            {
                Role adminRole = new Role()
                {
                    Name = "Admin"
                };

                database.Roles.Add(adminRole);
            }
            await database.SaveChangesAsync();

            if (database.Roles.FirstOrDefault(x => x.Name == "Explorer") == null)
            {
                Role expolorerRole = new Role()
                {
                    Name = "Explorer"
                };

                database.Roles.Add(expolorerRole);
            }
            await database.SaveChangesAsync();

            if (database.Roles.FirstOrDefault(x => x.Name == "Liquidator") == null)
            {
                Role liquidatorRole = new Role()
                {
                    Name = "Liquidator"
                };

               database.Roles.Add(liquidatorRole);

            }
            await database.SaveChangesAsync();

            if (database.Users.FirstOrDefault(x=>x.Username == configuration["AdminCredentials:Username"]!) == null)
            {
                User admin = new User()
                {
                    //дописать для админа
                    Username = configuration["AdminCredentials:Username"]!,
                    Email = configuration["AdminCredentials:Email"]!,
                    Password = configuration["AdminCredentials:Password"]!,
                    FirstName = "admin",
                    LastName = "admin",
                    Birtdate = DateTime.UtcNow
                };

                admin.Role = database.Roles.First(x=>x.Name == "Admin");

                database.Users.Add(admin);
            }

            await database.SaveChangesAsync();

            if (database.Types.FirstOrDefault(x=>x.Name == "Sea") == null)
            {
                PlaceType newType = new PlaceType()
                {
                    Name = "Sea"
                };

                database.Types.Add(newType);

                await database.SaveChangesAsync();

                Place place = new Place()
                {
                    Name = "Azov Sea",
                    Coordinates = [36.76951225744786f, 46.09193669306945f],
                    Type = newType
                };

                database.Places.Add(place); 

                await database.SaveChangesAsync();
            }

            var db = mongo.GetDatabase(configuration["Mongo:Database"]);

            //MongoMapper mapper = new MongoMapper();

            //mapper.Map();

            if (db.GetCollection<BsonDocument>(configuration["Mongo:MarkersCollection"]) is null)
            {
                await db.CreateCollectionAsync(configuration["Mongo:MarkersCollection"]);
            }

            //if (db.GetCollection<BsonDocument>(configuration["Mongo:ChatCollection"]) is null)
            //{
            //    await db.CreateCollectionAsync(configuration["Mongo:ChatCollection"]);
            //}

            

        }


    }
}
