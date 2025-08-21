namespace Application.Dtos.Appointments;

public class ServiceWithBarberDto
{
    public int ServiceId { get; set; }
    public Guid BarberId { get; set; }
}

public class CheckBarbersAvailabilityDto
{
    public DateOnly Date { get; set; } // Fecha que quiere reservar el cliente
    public List<ServiceWithBarberDto> ServicesWithBarberDto { get; set; } = []; // Servicios + barbero
}