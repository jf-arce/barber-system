using Application.Dtos.Services;
using Application.Dtos.SocialNetworks;
using Application.Dtos.Users;
using Domain.Entities;

namespace Application.Dtos.Barbers;

public class GetBarberDto : GetUserDto
{
    public string? Bio { get; set; } = string.Empty;
    public List<GetBarberServiceDto> Services { get; set; } = new();
    public List<GetSocialNetworkDto> SocialNetworks { get; set; } = new();
    
    public static GetBarberDto Create(Domain.Entities.Barber barber)
    {
        return new GetBarberDto
        {
            Id = barber.UserId,
            Name = barber.User.Name,
            Surname = barber.User.Surname,
            Email = barber.User.Email,
            Phone = barber.User.Phone,
            Gender = barber.User.Gender,
            BirthDate = barber.User.BirthDate,
            CreatedAt = barber.User.CreatedAt,
            Role = barber.User.Role,
            Bio = barber.Bio,
            Services = barber.Services?.Select(service => new GetBarberServiceDto
            {
                Id = service.Id,
                Name = service.Name,
            }).ToList() ?? new List<GetBarberServiceDto>(),
            SocialNetworks = barber.SocialNetworks?.Select(socialNetwork => new GetSocialNetworkDto
            {
                Name = socialNetwork.Name,
                Url = socialNetwork.Url
            }).ToList() ?? new List<GetSocialNetworkDto>() 
        };
    }
}