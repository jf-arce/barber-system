using Application.Dtos.Appointments;
using Application.Dtos.Services;

namespace Application.Dtos.AppointmentDetails;

public class GetAppointmentDetailDto
{
    public DateTime StartDateTime { get; init; }
    public DateTime EndDateTime { get; init; }
    public GetServiceDto Service { get; set; }
    public GetBarberAppointmentDto Barber { get; set; }
}