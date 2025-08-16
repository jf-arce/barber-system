using Application.Dtos.AppointmentDetails;

namespace Application.Dtos.Appointments;

public class CreateAppointmentDto
{
    public DateTime StartDateTime { get; set; }
    public Guid UserId { get; set; }
    public List<CreateAppointmentDetailDto> AppointmentDetails { get; set; } = [];

    public bool AssignBarberAutomatically { get; set; }
}
