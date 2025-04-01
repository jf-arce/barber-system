using Domain.Entities;

namespace Domain.Interfaces;

public interface IUser
{
    Task<List<User>> FindAll();
    Task<User> FindOne(Guid id);
    Task Create(User user);
    Task Update(User user);
    Task Delete(string id);
}
