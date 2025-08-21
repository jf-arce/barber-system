namespace Application.Dtos.Appointments;

public class AvailableSlotDto
{
    public TimeOnly Start { get; set; }
    public TimeOnly End { get; set; }
}

public class GetBarbersAvailabilityDto
{
    public DateOnly Date { get; set; }
    public List<AvailableSlotDto> AvailableSlots { get; set; } = [];
}

