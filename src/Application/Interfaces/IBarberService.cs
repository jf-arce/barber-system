using Application.Dtos.Barber;
using Domain.Entities;

namespace Application.Interfaces;

public interface IBarberService
{
   Task<List<Barber>> FindAll();
   Task<Barber?> FindById(int id);
   Task Create(CreateBarberDto createBarberDto);
   Task Update(UpdateBarberDto updateBarberDto);
}