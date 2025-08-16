using Application.Dtos.Appointments;
using FluentValidation;

namespace Application.Validators.Appointments;

public class CreateAppointmentValidator : AbstractValidator<CreateAppointmentDto>
{
    public CreateAppointmentValidator()
    {
        RuleFor(x => x.DateTime)
            .NotEmpty()
            .WithMessage("La fecha y hora de la cita no puede estar vacía");

        RuleFor(x => x.UserId)
            .NotEmpty()
            .Must(id => id != Guid.Empty)
            .WithMessage("UserId no puede ser vacío o Guid.Empty");

        RuleFor(x => x.Services)
            .NotEmpty()
            .WithMessage("Debe especificar al menos un servicio");

        RuleFor(x => x.AssignBarberAutomatically)
            .NotNull()
            .WithMessage("Debe especificar si se asigna el barbero automáticamente")
            .When(x => x.Services.Count != 0);

        RuleForEach(x => x.Services)
            .ChildRules(s =>
            {
                s.RuleFor(service => service.ServiceId)
                    .GreaterThan(0)
                    .WithMessage("ServiceId debe ser un número válido mayor a 0");
            });
        
        RuleForEach(x => x.Services)
            .ChildRules(s =>
            {
                s.RuleFor(service => service.BarberId)
                    .NotEmpty()
                    .WithMessage("El barbero no puede ser nulo cuando AssignBarberAutomatically es falso");
            }).When(x => !x.AssignBarberAutomatically);
    }
}