namespace Application.Dtos.AppointmentServices;

public class CreateAppointmentServiceDto
{
    public int ServiceId { get; set; }
    public Guid BarberId { get; set; }
}