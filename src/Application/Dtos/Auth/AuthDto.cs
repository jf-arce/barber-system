namespace Application.Dtos;

public class AuthDto
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public DateOnly BirthDate { get; set; }
}