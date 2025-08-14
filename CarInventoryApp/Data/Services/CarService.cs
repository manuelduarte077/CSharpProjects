using CarInventoryApp.Models;

namespace CarInventoryApp.Data.Services;

public class CarService : ICarService
{
    private readonly HttpClient _httpClient;

    public CarService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<CarDto>> GetAllCars()
    {
        var response =
            await _httpClient.GetFromJsonAsync<NhtsaResponse>("vehicles/GetMakesForVehicleType/car?format=json");

        if (response?.Results == null)
            return new List<CarDto>();

        return response.Results
            .Select(item => new CarDto
            {
                MakeId = item.MakeId,
                MakeName = item.MakeName,
            }).ToList();
    }
}