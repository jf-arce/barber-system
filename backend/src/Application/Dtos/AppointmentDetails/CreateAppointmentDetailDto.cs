namespace Application.Dtos.AppointmentDetails;

public class CreateAppointmentDetailDto
{
    public int ServiceId { get; set; }
    public Guid? BarberId { get; set; }
}