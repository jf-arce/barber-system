using Application.Dtos.User;
using Domain.Entities;

namespace Application.Interfaces;

public interface IUserService
{
    Task<List<User>> FindAll();
    Task<User> FindOne(Guid id);
    Task<User> FindByEmail(string email);
    Task Update(Guid id, UpdateUserDto updateUserDto);
    Task Delete(Guid id);
}
