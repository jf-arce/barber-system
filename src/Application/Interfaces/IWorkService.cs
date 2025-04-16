using Application.Dtos.Works;
using Domain.Entities;

namespace Application.Interfaces;

public interface IWorkService
{
    Task<List<Work>> FindAll();
    Task<List<Work>> FindByBarberId(Guid barberId);
    Task<Work> FindOne(Guid id);
    Task Create(CreateWorkDto createWorkDto);
    Task Update(Guid id, UpdateWorkDto updateWorkDto);
    Task Delete(Guid id);
}