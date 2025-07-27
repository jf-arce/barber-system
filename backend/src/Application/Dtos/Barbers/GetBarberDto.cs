using Application.Dtos.Lenguages;
using Application.Dtos.Skills;
using Application.Dtos.SocialNetworks;
using Application.Dtos.Users;
using Domain.Entities;

namespace Application.Dtos.Barbers;

public class GetBarberDto : GetUserDto
{
    public string? Bio { get; set; } = string.Empty;
    public List<GetSkillDto> Skills { get; set; } = new();
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
            Skills = barber.Skills?.Select(skill => new GetSkillDto
            {
                Id = skill.Id,
                Name = skill.Name,
                Description = skill.Description
            }).ToList() ?? new List<GetSkillDto>(),
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