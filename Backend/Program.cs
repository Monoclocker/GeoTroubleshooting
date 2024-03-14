using Backend.Data;
using Backend.Hubs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

namespace Backend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<DatabaseContext>(options => options.UseNpgsql(builder.Configuration["Database"] ?? throw new Exception("Database doesn't exist")));

            builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequiredLength = 8;
                options.Password.RequireUppercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            })
                .AddEntityFrameworkStores<DatabaseContext>();

            builder.Services.AddAuthorization();
            builder.Services.AddTransient<ITokenService, JwtTokenService>();
            builder.Services.AddAuthentication(options =>
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
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["jwt:Issuer"],
                        ValidAudience = builder.Configuration["jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["jwt:Key"]!))
                    };
                });

            builder.Services.AddSingleton(new MongoClient(builder.Configuration["Mongo:Connection"]));
            

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddSignalR(options =>
            {
                options.KeepAliveInterval = TimeSpan.FromMinutes(2);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();

                using (var scope = app.Services.CreateScope())
                {
                    try
                    {
                        var services = scope.ServiceProvider;
                        var configuration = builder.Configuration;
                        var userManager = services.GetService<UserManager<User>>();
                        var roleManager = services.GetService<RoleManager<IdentityRole<int>>>();

                        await Initializer.Initialize(configuration, roleManager!, userManager!);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }
                }

            }

            app.UseHttpsRedirection();

            app.UseCors(options =>
            {
                options.AllowAnyHeader();
                options.AllowAnyMethod();
                options.AllowAnyOrigin();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapHub<MapHub>("/map");
            app.MapControllers();
            //app.MapHub<ChatHub>("/chat");
            

            app.Run();
        }
    }
}
