using CarInventoryApp.Models;

namespace CarInventoryApp.Data.Services;

public interface ICarService
{
    Task<List<CarDto>> GetAllCars();
}