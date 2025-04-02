namespace Domain.Entities;

public class Barber : UserBase
{
    public string? Bio { get; set; }
    public virtual List<Language> Languages { get; set; } = [];
    public virtual List<Skill> Skills { get; set; } = [];
    public virtual List<SocialNetwork>? SocialNetworks { get; set; }
    public virtual List<Work>? Works { get; set; }
    public virtual List<Appointment>? Appointments { get; set; } = [];
    public virtual List<Review>? Reviews { get; set; } = [];
}