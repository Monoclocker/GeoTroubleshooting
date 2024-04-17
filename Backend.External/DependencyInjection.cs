using Backend.Application.Interfaces;
using Backend.Domain;
using Backend.External.Data;
using Backend.External.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
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

            services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<DatabaseContext>();

            services.AddScoped<ITokenService, JwtTokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IMapMarkerService, MapMarkerService>();
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {

                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ClockSkew = TimeSpan.FromSeconds(0),
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["jwt:Issuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Key"]!))
                    };
                });
            Console.WriteLine(configuration["jwt:Audience"]);
            services.AddSingleton(new MongoClient(configuration["Mongo:Connection"]));

            return services;
        }

        public async static Task<IServiceScope> AddStartConfiguration(this IServiceScope scope, IConfiguration configuration)
        {
            try
            {
                var services = scope.ServiceProvider;
                var userManager = services.GetService<UserManager<User>>();
                var roleManager = services.GetService<RoleManager<IdentityRole<int>>>();
                var mongo = services.GetService<MongoClient>();

                await Initializer.Initialize(configuration, roleManager!, userManager!, mongo!);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return scope;

        }
    }
}
