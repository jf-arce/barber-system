using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IServiceRepository : IGenericRepository<Service>
{
    Task<List<Service>> FindByMultipleIds(List<int> ids);
}