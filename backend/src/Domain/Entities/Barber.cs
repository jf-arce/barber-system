namespace Domain.Entities;

public class Barber
{
    public Guid UserId { get; init; }
    public string? Bio { get; set; }
    
    public virtual User User { get; init; } = null!;
    public virtual List<SocialNetwork>? SocialNetworks { get; init; }
    public virtual List<Work>? Works { get; init; }
    public virtual List<Review>? Reviews { get; init; } = [];

    public virtual List<Service> Services { get; init; } = [];
    public virtual List<AppointmentDetail> AppointmentDetails { get; init; } = [];
    public virtual List<BarberWorkSchedule> BarberWorkSchedules { get; init; } = [];
}