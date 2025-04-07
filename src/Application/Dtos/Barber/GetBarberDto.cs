using Application.Dtos.User;

namespace Application.Dtos.Barber;

public class GetBarberDto : GetUserDto
{
    public string Bio { get; set; } = string.Empty;
}