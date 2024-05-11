using Backend.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        IPlacesService placesService { get; set; }
        public PlacesController(IPlacesService placesService) 
        {
            this.placesService = placesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlaces()
        {
            return Ok(await placesService.GetPlaces());
        }

    }
}
