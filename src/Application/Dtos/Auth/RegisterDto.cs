namespace Application.Dtos.Auth;

public class RegisterDto : LoginDto
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string? Phone { get; set; }
    public DateOnly BirthDate { get; set; }
}