using Application.Dtos.Services;
using Application.Dtos.SocialNetworks;
using Application.Dtos.Users;
using Domain.Entities;

namespace Application.Dtos.Barbers;

public class GetBarberDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string BirthDate { get; set; } = string.Empty;
    public string? Phone { get; set; } = string.Empty;
    public string? Image { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? Bio { get; set; } = string.Empty;
    public List<GetBarberServiceDto> Services { get; set; } = new();
    public List<GetSocialNetworkDto> SocialNetworks { get; set; } = new();
    
    public static GetBarberDto Create(Domain.Entities.Barber barber)
    {
        const string dateFormat = "dd/MM/yyyy";
        var argentinaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("America/Argentina/Buenos_Aires");
        
        return new GetBarberDto
        {
            Id = barber.UserId,
            Name = barber.User.Name,
            Surname = barber.User.Surname,
            Email = barber.User.Email,
            Gender = barber.User.Gender,
            Role = barber.User.Role,
            BirthDate = barber.User.BirthDate.ToString(dateFormat),
            Phone = barber.User.Phone,
            Image = barber.User.Image,
            CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(barber.User.CreatedAt, argentinaTimeZone),
            UpdatedAt = TimeZoneInfo.ConvertTimeFromUtc(barber.User.UpdatedAt, argentinaTimeZone),
            Bio = barber.Bio,
            Services = barber.Services?.Select(service => new GetBarberServiceDto
            {
                Id = service.Id,
                Name = service.Name,
            }).ToList() ?? [],
            SocialNetworks = barber.SocialNetworks?.Select(socialNetwork => new GetSocialNetworkDto
            {
                Name = socialNetwork.Name,
                Url = socialNetwork.Url
            }).ToList() ?? []
        };
    }
}