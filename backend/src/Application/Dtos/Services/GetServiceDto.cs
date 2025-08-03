using Domain.Entities;

namespace Application.Dtos.Services;

public class GetServiceDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public float Price { get; set; }
    public int Duration { get; set; } // Duration in hours

    public static GetServiceDto Create(Service service)
    {
        return new GetServiceDto
        {
            Id = service.Id,
            Name = service.Name,
            Description = service.Description,
            Price = service.Price,
            Duration = service.Duration
        };
    }
}