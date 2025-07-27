using Application.Dtos.Services;
using Domain.Entities;

namespace Application.Dtos.Appointments;

public class GetAppointmentDto
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = null!;
    public Guid UserId { get; set; }
    public Guid BarberId { get; set; }
    public List<GetServiceDto> Services { get; set; } = [];

    
    public static GetAppointmentDto Create(Appointment appointment)
    {
        var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time");
        return new GetAppointmentDto
        {
            Id = appointment.Id,
            DateTime = appointment.DateTime,
            CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(appointment.CreatedAt, timeZone),
            Status = appointment.Status,
            Services = appointment.Services?.Select(service => new GetServiceDto
            {
                Name = service.Name,
                Description = service.Description,
                Price = service.Price,
                Duration = service.Duration
            }).ToList() ?? new List<GetServiceDto>(),
            UserId = appointment.UserId,
            BarberId = appointment.BarberId
        };
    }
}