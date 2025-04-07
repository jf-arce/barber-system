using Application.Dtos.Auth;
using Application.Dtos.User;

namespace Application.Dtos.Barber;

public class CreateBarberDto : RegisterDto
{
    public string Bio { get; set; } = string.Empty;
}