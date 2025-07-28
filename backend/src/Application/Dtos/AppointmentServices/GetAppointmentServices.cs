using Application.Dtos.Appointments;
using Application.Dtos.Services;

namespace Application.Dtos.AppointmentServices;

public class GetAppointmentServices
{
    public GetServiceDto Service { get; set; }
    public GetBarberAppointmentDto Barber { get; set; }
}