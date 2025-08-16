using Application.Dtos.Appointments;
using Application.Dtos.Services;

namespace Application.Dtos.AppointmentDetails;

public class GetAppointmentDetailDto
{
    public GetServiceDto Service { get; set; }
    public GetBarberAppointmentDto Barber { get; set; }
}