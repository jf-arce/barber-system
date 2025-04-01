using Domain.Entities;

namespace Domain.Interfaces;

public interface IUser
{
    Task<List<User>> FindAll();
    Task<User> FindOne(string id);
    Task Create(User user);
    Task Update(User user);
    Task Delete(string id);
}
