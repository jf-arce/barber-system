using Application.Dtos.AppointmentDetails;

namespace Application.Dtos.Appointments;

public class CheckBarbersAvailabilityDto
{
    public DateOnly Date { get; set; } // Fecha que quiere reservar el cliente
    public List<CreateAppointmentDetailDto> ServicesWithBarberDto { get; set; } = []; // Servicios + barbero
    public bool AssignBarberAutomatically { get; set; }
}