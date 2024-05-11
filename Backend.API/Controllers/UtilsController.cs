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
        public UtilsController(IUtilsService utilsService) 
        {
            this.utilsService = utilsService;
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

        public record class FilesPath(List<string> filesNames);

        [Authorize]
        [HttpPost("Upload")]
        public async Task<IActionResult> LoadFiles(List<IFormFile> files)
        {

            foreach (var file in files)
            {
                if (!System.IO.File.Exists($"wwwroot/images/{file.FileName}"))
                {
                    using (Stream stream = new FileStream($"wwwroot/images/{file.FileName}", FileMode.CreateNew))
                    {
                        await file.CopyToAsync(stream);
                    }
                }
            }
            return Ok();
        }
    }
}
