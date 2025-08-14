using CarInventoryApp.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarInventoryApp.Controllers
{
    public class CarsController : Controller
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        public async Task<IActionResult> Index()
        {
            var cars = await _carService.GetAllCars();
            return View(cars);
        }
    }
}