using Application.Dtos.Lenguages;
using Application.Dtos.Services;
using Application.Dtos.SocialNetworks;
using Application.Dtos.Users;

namespace Application.Dtos.Barbers;

public class GetBarberDto : GetUserDto
{
    public string? Bio { get; set; } = string.Empty;
    public List<GetServiceDto> Services { get; set; } = new();
    public List<GetLenguageDto> Languages { get; set; } = new();
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
            Services = barber.Services?.Select(service => new GetServiceDto
            {
                Name = service.Name,
                Description = service.Description
            }).ToList() ?? new List<GetServiceDto>(),
            Languages = barber.Languages?.Select(language => new GetLenguageDto
            {
                Name = language.Name
            }).ToList() ?? new List<GetLenguageDto>(),
            SocialNetworks = barber.SocialNetworks?.Select(socialNetwork => new GetSocialNetworkDto
            {
                Name = socialNetwork.Name,
                Url = socialNetwork.Url
            }).ToList() ?? new List<GetSocialNetworkDto>() 
        };
    }
}