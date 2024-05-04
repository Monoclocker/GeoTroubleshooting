using Backend.Application.Interfaces;
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

    }
}
