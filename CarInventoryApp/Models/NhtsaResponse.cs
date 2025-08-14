namespace CarInventoryApp.Models;

public class NhtsaResponse
{
    public int Count { get; set; }
    public String Message { get; set; } = null!;
    public List<CarDto>? Results { get; set; }
}