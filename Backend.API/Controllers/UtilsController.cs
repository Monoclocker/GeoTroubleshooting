using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UtilsController : ControllerBase
    {
        IUtilsService utilsService;
        IConfiguration configuration;
        public UtilsController(IUtilsService utilsService, IConfiguration configuration) 
        {
            this.utilsService = utilsService;
            this.configuration = configuration;
        }

        [HttpGet("Roles")]
        public async Task<IActionResult> GetRoles() 
        {
            return Ok(await utilsService.GetRoles());
        }

        [HttpGet("Search")]
        public async Task<IActionResult> GetUsernames(string input)
        {
            return Ok(await utilsService.GetUsernames(input));
        }

        [Authorize]
        [HttpPost("Upload")]
        public async Task<IActionResult> LoadFiles(List<IFormFile>? files)
        {

            if(files == null)
            {
                return Ok();
            }

            foreach (var file in files)
            {
                if (!System.IO.File.Exists(Path.Combine(configuration["fileStorage"]!, file.FileName)))
                {
                    using (Stream stream = new FileStream(Path.Combine(configuration["fileStorage"]!, file.FileName), FileMode.CreateNew))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
            }
            return Ok();
        }
    }
}
