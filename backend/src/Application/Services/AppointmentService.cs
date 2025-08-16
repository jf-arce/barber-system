using System.Net;
using Application.Dtos.Appointments;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Repositories;

namespace Application.Services;

public class AppointmentService : IAppointmentService
{
    private readonly IAppointmentRepository _appointmentRepository;
    private readonly IServiceRepository _serviceRepository;
    private readonly IAppointmentServicesRepository _appointmentServiceRepository;
    private readonly IBarberRepository _barberRepository;
    
    private const int MonthsInAdvanceLimit = 5;
    private const int WorkDayStartHour = 8;
    private const int WorkDayEndHour = 18;
    private const int MinimumAnticipationMinutes = 30;

    public AppointmentService(
        IAppointmentRepository appointmentRepository, 
        IServiceRepository serviceRepository,
        IAppointmentServicesRepository appointmentServicesRepository,
        IBarberRepository barberRepository)
    {
        _appointmentRepository = appointmentRepository;
        _serviceRepository = serviceRepository;
        _appointmentServiceRepository = appointmentServicesRepository;
        _barberRepository = barberRepository;
    }
    
    public async Task Create(CreateAppointmentDto createAppointmentDto)
    {
         // 1️⃣ Validar fecha, hora y los servicios enviados
         
        ValidateDateTime(createAppointmentDto.DateTime);
        
        var services = await _serviceRepository
            .FindByMultipleIds(createAppointmentDto.Services
                .Select(s => s.ServiceId).ToList());

        if (services.Count != createAppointmentDto.Services.Count)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "One or more services not found");

        // 2️⃣ Crear la cita
        var newAppointment = new Appointment
        {
            DateTime = createAppointmentDto.DateTime,
            UserId = createAppointmentDto.UserId
        };
        
        await _appointmentRepository.Create(newAppointment);

        // Asignar el o los servicios a la cita (AppointmentServices) donde cada servicio puede tener un barbero asignado.
        try
        {
            // 3️⃣ Asignación manual
            if (!createAppointmentDto.AssignBarberAutomatically)
            {
                // Validamos que los barberos no sean nulos
                if (createAppointmentDto.Services.Any(s => s.BarberId == Guid.Empty))
                    throw new CustomHttpException(HttpStatusCode.BadRequest, "El barbero no puede ser nulo");
                
                // Validar que los barberos enviados existan y estén disponibles
                var barberIds = createAppointmentDto.Services
                    .Select(s => s.BarberId!.Value)
                    .Where(id => true)
                    .Distinct()
                    .ToList();

                var barbersFound = await _barberRepository.FindAllByIds(barberIds);

                if (barbersFound.Count != barberIds.Count)
                    throw new CustomHttpException(HttpStatusCode.BadRequest, "Uno o más barberos no encontrados");
                
                // Validar que los barberos elegidos estén disponibles
                foreach (var serviceDto in createAppointmentDto.Services)
                {
                    var service = services.First(s => s.Id == serviceDto.ServiceId);
                    var isBarberAvailable = await _barberRepository.IsBarberAvailable(
                        serviceDto.BarberId!.Value,
                        createAppointmentDto.DateTime,
                        service.Duration);

                    if (!isBarberAvailable)
                    {
                        throw new CustomHttpException(HttpStatusCode.BadRequest,
                            $"El barbero {serviceDto.BarberId} no está disponible para el servicio {serviceDto.ServiceId} " +
                            $"a las {ToArgentina(createAppointmentDto.DateTime):HH:mm}");
                    }
                }
                
                var appointmentServices = createAppointmentDto.Services
                    .Select(serv => new AppointmentServices
                    {
                        AppointmentId = newAppointment.Id,
                        ServiceId = serv.ServiceId,
                        BarberId = serv.BarberId!.Value
                    }).ToList();

                await _appointmentServiceRepository.AddRange(appointmentServices);
            }
            else
            {
                // 4️⃣ Asignación automática (independientemente si hay un solo servicio o varios)
                var appointmentStart = createAppointmentDto.DateTime;

                foreach (var serviceDto in createAppointmentDto.Services)
                {
                    var service = services.First(s => s.Id == serviceDto.ServiceId);
                    
                    var availableBarbers = await _barberRepository
                        .FindAllAvailableBarbers(appointmentStart, service.Duration);
                    
                    if (availableBarbers.Count == 0)
                        throw new CustomHttpException(HttpStatusCode.NotFound,
                            $"No se encontraron barberos disponibles para {service.Name} a las {ToArgentina(appointmentStart):HH:mm}");
                    
                    // // Elegimos el que tenga menos citas en el dia (para balancear la carga de trabajo)
                    var barber = availableBarbers
                        .OrderBy(b => b.AppointmentServices.Count(aserv =>
                            aserv.Appointment.DateTime.Date == appointmentStart.Date))
                        .First();
                    
                    var appointmentService = new AppointmentServices
                    {
                        AppointmentId = newAppointment.Id,
                        ServiceId = service.Id,
                        BarberId = barber.UserId
                    };

                    await _appointmentServiceRepository.Create(appointmentService);

                    // Sumar duración del servicio para que la siguiente cita empiece cuando termina la anterior
                    appointmentStart = appointmentStart.AddHours(service.Duration);
                    
                    /*Esto es para que si hay varios servicios, se asignen consecutivos.
                    Por ejemplo si un servicio dura 1 hora y el siguiente 2 horas,
                    la cita completa dura 3 horas seguidas.
                    
                    No hacemos que el cliente tenga que venir en dos horarios distintos.
                    */
                }
            }
        }
        catch (Exception ex)
        {
            // Si falla algo al crear AppointmentServices, eliminamos la cita
            await _appointmentRepository.Delete(newAppointment);
            throw;
        }
    }

    public async Task<List<Appointment>> FindAllByBarberId(Guid barberId, DateTime? startDate, DateTime? endDate, string? status)
    {
        var appointments = await _appointmentRepository.FindAllByBarberId(barberId, startDate, endDate, status);
        
        if (appointments.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointments not found");
        return appointments;
    }

    public async Task<List<Appointment>> FindAllByUserId(Guid userId, DateTime? startDate, DateTime? endDate, string? status)
    {
        var appointments = await _appointmentRepository.FindAllByUserId(userId, startDate, endDate, status);
        
        if (appointments.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointments not found");
        return appointments;
    }

    public async Task<Appointment> FindById(int id)
    {
        var appointment = await _appointmentRepository.FindById(id);
        
        if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");
        return appointment;
    }

    public async Task ChangeStatus(int id, string newStatus)
    { 
        //TODO: Validar que exista el status en el enum
        
       var appointment = await _appointmentRepository.FindById(id); 
       if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");

       appointment.Status = newStatus;

       await _appointmentRepository.Update(appointment);
    }

    public async Task Reschedule(int id, DateTime newDateTime)
    {
        var appointment = await _appointmentRepository.FindById(id);
        if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");

        appointment.DateTime = newDateTime;
        
        await _appointmentRepository.Update(appointment);
    }

    public Task Notify()
    {
        throw new NotImplementedException();
    }
    
    // Auxiliary methods
    private static DateTime ToArgentina(DateTime utcDateTime)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time"));
    }
    
    private static void ValidateDateTime(DateTime datetimeDto)
    { 
        var argentinaDateTimeDto = ToArgentina(datetimeDto);
        
        if (datetimeDto < DateTime.UtcNow)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "La fecha y hora de la cita no puede ser en el pasado");
        
        if (datetimeDto > DateTime.UtcNow.AddMonths(MonthsInAdvanceLimit))
            throw new InvalidOperationException($"La cita no puede ser más de {MonthsInAdvanceLimit} meses en el futuro");
        
        if (ToArgentina(datetimeDto).Hour is < WorkDayStartHour or > WorkDayEndHour)
            throw new InvalidOperationException("La cita debe estar dentro del horario laboral (08:00 a 18:00)");
        
        if (argentinaDateTimeDto.Minute != 0 || argentinaDateTimeDto.Second != 0)
            throw new InvalidOperationException("La cita debe comenzar en una hora exacta");
        
        ValidateAnticipation(datetimeDto);
    }
    
    private static void ValidateAnticipation(DateTime datetimeDto)
    {
        var argentinaDateTimeDto = ToArgentina(datetimeDto);
        var nowArgentina = ToArgentina(DateTime.UtcNow);
        var minimumAnticipationTime = TimeSpan.FromMinutes(MinimumAnticipationMinutes);
        // Redondear la hora actual hacia arriba a la próxima hora
        var nextHour = new DateTime(nowArgentina.Year, nowArgentina.Month, nowArgentina.Day, nowArgentina.Hour, 0, 0).AddHours(1);

        if (argentinaDateTimeDto.Date != nowArgentina.Date) return; // Si la fecha no es hoy, no se aplica la validación de anticipación
        
        // Si la diferencia entre la hora actual y la próxima hora es menor que el tiempo minimo de anticipacion en minutos
        // O la hora de reserva no es igual o posterior a la próxima hora redondeada hacia arriba, no se puede reservar
        if (nextHour - nowArgentina < minimumAnticipationTime || argentinaDateTimeDto < nextHour)
            throw new InvalidOperationException($"La cita debe reservarse con al menos { MinimumAnticipationMinutes } minutos de anticipación y comenzar en una hora exacta");
    }
}