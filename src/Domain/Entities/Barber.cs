namespace Domain.Entities;

public class Barber : User
{
    public string? Bio { get; set; }
    public virtual List<Language> Languages { get; set; } = [];
    public virtual List<Skill> Skills { get; set; } = [];
    public virtual List<SocialNetwork>? SocialNetworks { get; set; }
    public virtual List<Work>? Works { get; set; }
    public virtual new List<Review>? Reviews { get; set; }
    public virtual List<Appointment>? AppointmentsBarber { get; set; } = [];
}