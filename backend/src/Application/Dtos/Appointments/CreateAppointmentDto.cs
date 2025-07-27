namespace Application.Dtos.Appointments;

public class CreateAppointmentDto
{
    public DateTime DateTime { get; set; }
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }
    
    public List<int> ServiceIds { get; set; } = new();
}
