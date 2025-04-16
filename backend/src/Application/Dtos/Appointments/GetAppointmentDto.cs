using Domain.Entities;

namespace Application.Dtos.Appointments;

public class GetAppointmentDto
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = null!;

    public virtual Service Service { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public virtual Barber Barber { get; set; } = null!;
}