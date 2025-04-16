namespace Application.Dtos.Appointments;

public class FilterAppointmentDto
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Status { get; set; }
}