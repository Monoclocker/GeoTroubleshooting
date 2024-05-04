using Backend.Application.Interfaces;
using Backend.External.Data;
using Backend.External.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

namespace Backend.External
{
    public static class DependencyInjection
    {

        public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration) 
        {

            services.AddDbContext<DatabaseContext>(options =>
            {
                options.UseNpgsql(configuration["Database"] ?? throw new Exception("Wrong string"));
            });

            services.AddScoped<IDatabase>(provider => provider.GetService<DatabaseContext>()!);
            services.AddSingleton(new MongoClient(configuration["Mongo:Connection"]));
            services.AddScoped(provider => provider.GetService<MongoClient>()!.GetDatabase(configuration["Mongo:Database"]));
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUtilsService, UtilsService>();
            //services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IMapMarkerService, MapMarkerService>();

            return services;
        }

        public async static Task<IServiceScope> AddStartConfiguration(this IServiceScope scope, IConfiguration configuration)
        {
            try
            {
                var services = scope.ServiceProvider;
                var mongo = services.GetService<MongoClient>();
                var database = services.GetService<DatabaseContext>();

                await database!.Database.EnsureCreatedAsync();

                await Initializer.Initialize(configuration, mongo!, database!);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return scope;

        }
    }
}
