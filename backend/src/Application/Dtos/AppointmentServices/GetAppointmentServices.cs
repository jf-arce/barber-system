using Application.Dtos.Barbers;
using Application.Dtos.Services;

namespace Application.Dtos.AppointmentServices;

public class GetAppointmentServices
{
    public GetServiceDto Service { get; set; }
    public GetBarberDto Barber { get; set; } 
}