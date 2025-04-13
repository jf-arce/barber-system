namespace Application.Dtos.Appointments;

public class CreateAppointmentDto
{
    public DateTime DateTime { get; set; }
    public int ServiceId { get; set; }
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }
}