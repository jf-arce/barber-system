namespace Domain.Entities;

public class Barber
{
    public Guid UserId { get; set; }
    public string? Bio { get; set; }
    
    public virtual User User { get; set; } = null!;
    public virtual List<Language> Languages { get; set; } = [];
    public virtual List<SocialNetwork>? SocialNetworks { get; set; }
    public virtual List<Work>? Works { get; set; }
    public virtual List<Review>? Reviews { get; set; } = [];

    public virtual List<Service> Services { get; set; } = [];
    public virtual List<AppointmentServices> AppointmentServices { get; set; } = [];
}