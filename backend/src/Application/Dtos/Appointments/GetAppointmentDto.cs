using Application.Dtos.AppointmentDetails;
using Application.Dtos.Barbers;
using Application.Dtos.Services;
using Domain.Entities;

namespace Application.Dtos.Appointments;

public class GetAppointmentDto
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Status { get; set; } = null!;
    public GetUserAppointmentDto User { get; set; }
    public List<GetAppointmentDetailDto> AppointmentDetails { get; set; } = [];

    
    public static GetAppointmentDto Create(Appointment appointment)
    {
        var timeZone = TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time");
        return new GetAppointmentDto
        {
            Id = appointment.Id,
            CreatedAt = TimeZoneInfo.ConvertTimeFromUtc(appointment.CreatedAt, timeZone),
            Status = appointment.Status,
            User = new GetUserAppointmentDto
            {
                Id = appointment.UserId,
                Name = appointment.User?.Name ?? string.Empty,
                Surname = appointment.User?.Surname ?? string.Empty,
            },
            AppointmentDetails = appointment.AppointmentDetails.Select(aserv => new GetAppointmentDetailDto
            {
                StartDateTime = aserv.StartDateTime,
                EndDateTime = aserv.EndDateTime,
                Service = new GetServiceDto
                {
                    Name = aserv.Service.Name,
                    Description = aserv.Service.Description,
                    Price = aserv.Service.Price,
                    Duration = aserv.Service.Duration
                },
                Barber = new GetBarberAppointmentDto
                {
                    Id = aserv.BarberId,
                    Name = aserv.Barber.User.Name,
                    Surname = aserv.Barber.User.Surname
                }
            }).ToList() ?? [],
        };
    }
}