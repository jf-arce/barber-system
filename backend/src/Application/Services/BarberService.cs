using System.Net;
using Application.Dtos.Barbers;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums.User;
using Domain.Repositories;

namespace Application.Services;

public class BarberService : IBarberService
{
    private readonly IBarberRepository _barberRepository;
    private readonly IUserRepository _userRepository;
    
    public BarberService(IBarberRepository barberRepository, IUserRepository userRepository)
    {
        _barberRepository = barberRepository;
        _userRepository = userRepository;
    }
    
    public async Task<List<Barber>> FindAll()
    {
        var barbers = await _barberRepository.FindAll();
        if (barbers.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "No barbers found");
        
        return barbers;
    }

    public async Task<Barber?> FindById(Guid id)
    {
        var barber = await _barberRepository.FindById(id);
        if (barber == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Barber not found");
        
        return barber;
    }

    public async Task Create(CreateBarberDto createBarberDto)
    {
        var user = new User
        {
            Name = createBarberDto.Name,
            Surname = createBarberDto.Surname,
            Email = createBarberDto.Email,
            Password = createBarberDto.Password,
            Gender = createBarberDto.Gender,
            Role = UserRolesEnum.Barber.ToString(),
            Phone = createBarberDto.Phone ?? null,
            BirthDate = createBarberDto.BirthDate,
        };

        var barber = new Barber
        {
            UserId = user.Id,
            Bio = createBarberDto.Bio,
        };

        await _userRepository.Create(user);
        await _barberRepository.Create(barber);
    }
    
    public async Task Update(Guid id, UpdateBarberDto updateBarberDto)
    {
        var barber = await _barberRepository.FindById(id);
        if (barber == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Barber not found");

        barber.Bio = updateBarberDto.Bio ?? barber.Bio;
        barber.User.Name = updateBarberDto.Name ?? barber.User.Name;
        barber.User.Surname = updateBarberDto.Surname ?? barber.User.Surname;
        barber.User.Email = updateBarberDto.Email ?? barber.User.Email;
        barber.User.Gender = updateBarberDto.Gender ?? barber.User.Gender;
        barber.User.Phone = updateBarberDto.Phone ?? barber.User.Phone;
        barber.User.BirthDate = updateBarberDto.BirthDate ?? barber.User.BirthDate;
        
        await _barberRepository.Update(barber);
        await _userRepository.Update(barber.User);
    }
}