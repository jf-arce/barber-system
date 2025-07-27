namespace Application.Dtos.Services;

public class GetServiceDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public float Price { get; set; }
    public int Duration { get; set; } // Duration in hours
}