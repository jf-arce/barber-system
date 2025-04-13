using Application.Dtos.Auth;

namespace Application.Dtos.Barbers;

public class CreateBarberDto : RegisterDto
{
    public string Bio { get; set; } = string.Empty;
}