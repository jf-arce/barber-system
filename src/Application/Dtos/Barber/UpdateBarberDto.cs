namespace Application.Dtos.Barber;

public class UpdateBarberDto
{
    public string? Name { get; set; } = string.Empty;
    public string? Surname { get; set; } = string.Empty;
    public string? Email { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public string? Gender { get; set; } = string.Empty;
    public DateOnly? BirthDate { get; set; }
    public string? Bio { get; set; } = string.Empty;
}