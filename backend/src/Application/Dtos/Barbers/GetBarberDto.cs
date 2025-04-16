using Application.Dtos.Users;

namespace Application.Dtos.Barbers;

public class GetBarberDto : GetUserDto
{
    public string? Bio { get; set; } = string.Empty;
    
    public static GetBarberDto Create(Domain.Entities.Barber barber)
    {
        return new GetBarberDto
        {
            Name = barber.User.Name,
            Surname = barber.User.Surname,
            Email = barber.User.Email,
            Phone = barber.User.Phone,
            Gender = barber.User.Gender,
            BirthDate = barber.User.BirthDate,
            CreatedAt = barber.User.CreatedAt,
            Role = barber.User.Role,
            Bio = barber.Bio,
        };
    }
}