using System.Net;
using Application.Dtos.Services;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Services;

public class ServiceService : IServiceService
{
    private readonly IServiceRepository _serviceRepository;
    
    public ServiceService(IServiceRepository serviceRepository)
    {
        _serviceRepository = serviceRepository;
    }


    public async Task Create(CreateServiceDto createServiceDto)
    {
        var newService = new Service
        {
            Name = createServiceDto.Name,
            Description = createServiceDto.Description,
            Price = createServiceDto.Price,
            Duration = createServiceDto.Duration
        };

        await _serviceRepository.Create(newService);
    }

    public async Task<List<Service>> FindAll()
    {
        var services = await _serviceRepository.FindAll();
        if (services.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "Services not found");
        return services;
    }

    public async Task<Service> FindById(int id)
    {
        var service = await _serviceRepository.FindById(id);
        if (service == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Service not found");
        return service;
    }

    public async Task Update(int id, UpdateServiceDto updateServiceDto)
    {
        var service = await _serviceRepository.FindById(id);
        if (service == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Service not found");

        service.Name = updateServiceDto.Name ?? service.Name;
        service.Description = updateServiceDto.Description ?? service.Description;
        service.Price = updateServiceDto.Price ?? service.Price;
        service.Duration = updateServiceDto.Duration ?? service.Duration;

        await _serviceRepository.Update(service);
    }

    public async Task Delete(int id)
    {
        var service = await _serviceRepository.FindById(id);
        if (service == null) throw new CustomHttpException(HttpStatusCode.NotFound, "Service not found");
        
        if (service.AppointmentDetails is { Count: > 0 })
            throw new CustomHttpException(HttpStatusCode.BadRequest, "Service has appointments");

        if (service.Barbers is { Count: > 0 })
            throw new CustomHttpException(HttpStatusCode.BadRequest, "Service has skills");
        
        await _serviceRepository.Delete(service);
    }
}