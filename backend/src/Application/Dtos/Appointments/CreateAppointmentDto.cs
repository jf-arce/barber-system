using Application.Dtos.AppointmentServices;

namespace Application.Dtos.Appointments;

public class CreateAppointmentDto
{
    public DateTime DateTime { get; set; }
    public Guid UserId { get; set; }
    public List<CreateAppointmentServiceDto> Services { get; set; } = new();
}
