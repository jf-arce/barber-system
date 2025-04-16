namespace Application.Dtos.Works;

public class CreateWorkDto
{
    public string name { get; set; } = null!;
    public string? image { get; set; } = null!;
    public string? description { get; set; } = null!;
    public Guid barberId { get; set; }
}