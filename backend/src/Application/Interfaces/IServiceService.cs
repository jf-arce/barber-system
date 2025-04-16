using Application.Dtos.Services;
using Domain.Entities;

namespace Application.Interfaces;

public interface IServiceService
{
    Task Create(CreateServiceDto createServiceDto);
    Task<List<Service>> FindAll();
    Task<Service> FindById(int id);
    Task Update(int id, UpdateServiceDto updateServiceDto);
    Task Delete(int id);
}