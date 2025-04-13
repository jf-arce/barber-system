using Application.Dtos.Barber;
using Domain.Entities;

namespace Application.Interfaces;

public interface IBarberService
{
   Task<List<Barber>> FindAll();
   Task<Barber?> FindById(Guid id);
   Task Create(CreateBarberDto createBarberDto);
   Task Update(Guid id, UpdateBarberDto updateBarberDto);
}