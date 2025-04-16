using Application.Dtos.Auth;

namespace Application.Dtos.Barbers;

public class CreateBarberDto : RegisterDto
{
    public string? Bio { get; set; }
    public List<int> LanguageIds { get; set; } = null!;
    public List<int> SkillIds { get; set; } = null!;
}