using Domain.Entities;
using Domain.Repositories.Base;

namespace Domain.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    Task<User?> FindByEmail(string email);
}