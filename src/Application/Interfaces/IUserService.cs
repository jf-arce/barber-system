using Domain.Entities;

namespace Application.Interfaces;

public interface IUserService
{
    Task<List<User>> FindAll();
    Task<User> FindOne(Guid id);
    Task Update(User user);
    Task Delete(Guid id);
}
