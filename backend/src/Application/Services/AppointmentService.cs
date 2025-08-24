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
    private readonly IAppointmentDetailRepository _appointmentDetailRepository;
    private readonly IBarberRepository _barberRepository;
    
    private const int MonthsInAdvanceLimit = 5;
    private const int WorkDayStartHour = 8;
    private const int WorkDayEndHour = 18;
    private const int MinimumAnticipationMinutes = 30;

    public AppointmentService(
        IAppointmentRepository appointmentRepository, 
        IServiceRepository serviceRepository,
        IAppointmentDetailRepository appointmentDetailRepository,
        IBarberRepository barberRepository)
    {
        _appointmentRepository = appointmentRepository;
        _serviceRepository = serviceRepository;
        _appointmentDetailRepository = appointmentDetailRepository;
        _barberRepository = barberRepository;
    }
    
    public async Task Create(CreateAppointmentDto createAppointmentDto)
    {
         // 1️⃣ Validar fecha, hora y los servicios enviados
         
        ValidateDateTime(createAppointmentDto.StartDateTime);
        
        var services = await _serviceRepository
            .FindByMultipleIds(createAppointmentDto.AppointmentDetails
                .Select(s => s.ServiceId).ToList());

        if (services.Count != createAppointmentDto.AppointmentDetails.Count)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "Uno o más servicios no encontrados");

        // 2️⃣ Crear la cita
        var newAppointment = new Appointment
        {
            UserId = createAppointmentDto.UserId
        };
        
        await _appointmentRepository.Create(newAppointment);

        // Asignar el o los servicios a la cita (AppointmentServices) donde cada servicio puede tener un barbero asignado.
         try 
         {
            // Comenzamos con la hora de inicio indicada por el usuario
            var appointmentStartDto = createAppointmentDto.StartDateTime;

            // 3️⃣ Recorrer todos los detalles de la cita solicitados
            foreach (var appointmentDetailDto in createAppointmentDto.AppointmentDetails)
            {
                var serviceDto = services.First(s => s.Id == appointmentDetailDto.ServiceId);
                Guid barberId;

                if (!createAppointmentDto.AssignBarberAutomatically)
                {
                    // 3️⃣ Asignación manual

                    // Validamos que los barberos no sean nulos
                    if (appointmentDetailDto.BarberId == null || appointmentDetailDto.BarberId == Guid.Empty)
                        throw new CustomHttpException(HttpStatusCode.BadRequest, "El barbero no puede ser nulo");

                    barberId = appointmentDetailDto.BarberId.Value;

                    // Validar que el barbero enviado exista y pueda hacer el servicio
                    var barbersFound = await _barberRepository.FindAllByIds([barberId]);
                    if (barbersFound.Count == 0 || barbersFound.First().Services.All(bs => bs.Id != serviceDto.Id))
                        throw new CustomHttpException(HttpStatusCode.BadRequest, $"Barbero {barberId} no puede realizar {serviceDto.Name}");

                    // Validar que el barbero elegido esté disponible
                    var isBarberAvailable = await _barberRepository.IsBarberAvailable(
                        barberId, appointmentStartDto, serviceDto.Duration);

                    if (!isBarberAvailable)
                        throw new CustomHttpException(HttpStatusCode.BadRequest,
                            $"El barbero {barberId} no está disponible para el servicio {serviceDto.Name} " +
                            $"a las {ToArgentina(appointmentStartDto):HH:mm}");
                }
                else
                {
                    // 4️⃣ Asignación automática (independientemente si hay un solo servicio o varios)
                    var availableBarbers = await _barberRepository
                        .FindAllAvailableBarbers(appointmentStartDto, serviceDto.Duration);
                    
                    // Filtrar barberos que puedan hacer el servicio
                    var candidateBarbers = availableBarbers
                        .Where(b => b.Services.Any(bs => bs.Id == serviceDto.Id))
                        .ToList();

                    if (candidateBarbers.Count == 0)
                        throw new CustomHttpException(HttpStatusCode.NotFound,
                            $"No hay barberos disponibles para {serviceDto.Name} a las {ToArgentina(appointmentStartDto):HH:mm}");

                    // Elegimos el que tenga menos citas en el día (para balancear la carga de trabajo)
                    barberId = candidateBarbers
                        .OrderBy(b => b.AppointmentDetails.Count(ad => ad.StartDateTime.Date == appointmentStartDto.Date))
                        .First().UserId;
                }

                // Crear AppointmentDetail con start y end
                var detail = new AppointmentDetail
                {
                    AppointmentId = newAppointment.Id,
                    ServiceId = serviceDto.Id,
                    BarberId = barberId,
                    StartDateTime = appointmentStartDto,
                    EndDateTime = appointmentStartDto.AddHours(serviceDto.Duration)
                };

                await _appointmentDetailRepository.Create(detail);

                // Sumar duración del servicio para que la siguiente cita empiece cuando termina la anterior
                appointmentStartDto = detail.EndDateTime;

                /*Esto es para que si hay varios servicios, se asignen consecutivos.
                Por ejemplo si un servicio dura 1 hora y el siguiente 2 horas,
                la cita completa dura 3 horas seguidas.

                No hacemos que el cliente tenga que venir en dos horarios distintos.
                */
            }
         }
         catch (Exception)
         {
            // Si falla algo al crear AppointmentDetails, eliminamos la cita completa
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
        // var appointment = await _appointmentRepository.FindById(id);
        // if (appointment == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Appointment not found");
        //
        // appointment.DateTime = newDateTime;
        //
        // await _appointmentRepository.Update(appointment);
        throw new NotImplementedException();
    }

    public Task Notify()
    {
        throw new NotImplementedException();
    }

    public async Task<GetBarbersAvailabilityDto> GetBarbersAvailability(CheckBarbersAvailabilityDto dto)
    {
        // Validar fecha
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        if (dto.Date < today)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "La fecha de la cita no puede estar en el pasado");

        if (dto.Date > today.AddMonths(MonthsInAdvanceLimit))
            throw new InvalidOperationException($"La cita no puede ser más de {MonthsInAdvanceLimit} meses en el futuro");
        
        var services = await _serviceRepository
            .FindByMultipleIds(dto.ServicesWithBarberDto
                .Select(s => s.ServiceId).ToList());

        if (services.Count != dto.ServicesWithBarberDto.Count)
            throw new CustomHttpException(HttpStatusCode.BadRequest, "Uno o más servicios no encontrados");
        
        // Mapear servicios con duración
        var serviceEntities = await _serviceRepository.FindByMultipleIds(
            dto.ServicesWithBarberDto.Select(s => s.ServiceId).ToList()
        );

        var servicesWithDuration = dto.ServicesWithBarberDto
            .Select(s => new
            {
                s.ServiceId,
                s.BarberId, // puede venir vacío si AssignBarberAutomatically = true
                DurationInHours = serviceEntities.First(se => se.Id == s.ServiceId).Duration
            })
            .ToList();

        // Horario de jornada local Argentina → UTC
        var argentinaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Argentina Standard Time");
        var startOfDayUtc = TimeZoneInfo.ConvertTimeToUtc(
            dto.Date.ToDateTime(new TimeOnly(WorkDayStartHour, 0)), argentinaTimeZone
        );
        var endOfDayUtc = TimeZoneInfo.ConvertTimeToUtc(
            dto.Date.ToDateTime(new TimeOnly(WorkDayEndHour + 1, 0)), argentinaTimeZone
        ); // +1 para incluir hasta las 18:00

        // Obtener detalles de turnos existentes (UTC)
        var appointmentDetails = await _appointmentDetailRepository
            .GetAppointmentDetailsByDateRange(startOfDayUtc, endOfDayUtc);

        var totalDuration = servicesWithDuration.Sum(s => s.DurationInHours);
        var availableSlots = new List<AvailableSlotDto>();
        var current = startOfDayUtc;

        while (current.AddHours(totalDuration) <= endOfDayUtc)
        {
            var slotEnd = current.AddHours(totalDuration);
            bool allFree;

            if (dto.AssignBarberAutomatically)
            {
                // Buscar barberos posibles para cada servicio
                allFree = true;

                foreach (var service in servicesWithDuration)
                {
                    var possibleBarbers = await _barberRepository.GetBarbersForService(service.ServiceId);

                    // Algún barbero libre para este servicio?
                    var hasFreeBarber = possibleBarbers.Any(barberId =>
                        !appointmentDetails.Any(ad =>
                            ad.BarberId == barberId &&
                            ad.StartDateTime < slotEnd &&
                            ad.EndDateTime > current
                        )
                    );

                    if (hasFreeBarber) continue;
                    allFree = false;
                    break;
                }
            }
            else
            {
                // Caso original: validar con los barberos enviados en el dto
                allFree = servicesWithDuration.All(s =>
                    !appointmentDetails.Any(ad =>
                        ad.BarberId == s.BarberId &&
                        ad.StartDateTime < slotEnd &&
                        ad.EndDateTime > current
                    )
                );
            }

            if (allFree)
            {
                availableSlots.Add(new AvailableSlotDto
                {
                    Start = TimeOnly.FromDateTime(ToArgentina(current)),
                    End   = TimeOnly.FromDateTime(ToArgentina(slotEnd))
                });
            }

            current = slotEnd; // Avanzar al siguiente rango posible
        }

        return new GetBarbersAvailabilityDto
        {
            Date = dto.Date,
            AvailableSlots = availableSlots
        };
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