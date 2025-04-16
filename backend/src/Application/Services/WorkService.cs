using Application.Dtos.Works;
using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Services;

public class WorkService : IWorkService
{
    private readonly IWorkRepository _workRepository;
    
    public WorkService(IWorkRepository workRepository)
    {
        _workRepository = workRepository;
    }
    
    public async Task<List<Work>> FindAll()
    {
        throw new NotImplementedException();
    }

    public async Task<List<Work>> FindByBarberId(Guid barberId)
    {
        throw new NotImplementedException();
    }

    public async Task<Work> FindOne(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task Create(CreateWorkDto createWorkDto)
    {
        throw new NotImplementedException();
    }

    public async Task Update(Guid id, UpdateWorkDto updateWorkDto)
    {
        throw new NotImplementedException();
    }

    public async Task Delete(Guid id)
    {
        throw new NotImplementedException();
    }
}