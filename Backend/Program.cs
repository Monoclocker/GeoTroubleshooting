using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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

            builder.Services.AddIdentity<User, IdentityRole<int>>()
                .AddEntityFrameworkStores<DatabaseContext>();

            builder.Services.AddAuthorization();
            builder.Services.AddTransient<ITokenService, JwtTokenService>();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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

            //builder.Services.AddSingleton(new MongoClient(builder.Configuration["MongoDatabase"]));
            

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

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

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
