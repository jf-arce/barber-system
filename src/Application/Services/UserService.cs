using Application.Interfaces;
using Domain.Entities;
using Domain.Repositories;

namespace Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<List<User>> FindAll()
    {
        var users = await _userRepository.FindAll();
        if (users.Count == 0) throw new KeyNotFoundException("No users found.");
        return users;
    }

    public async Task<User> FindOne(Guid id)
    {
        var user = await _userRepository.FindById(id);
        if (user == null) throw new KeyNotFoundException("User not found.");
        return user;
    }

    public async Task Update(User user)
    {
        var existingUser = await _userRepository.FindById(user.Id);
        if (existingUser == null) throw new KeyNotFoundException("User not found.");

        existingUser.Name = user.Name;
        existingUser.Surname = user.Surname;
        existingUser.Email = user.Email;
        existingUser.Phone = user.Phone;
        existingUser.BirthDate = user.BirthDate;
        existingUser.Gender = user.Gender;

        await _userRepository.Update(existingUser);
    }

    public async Task Delete(Guid id)
    {
        var user = await _userRepository.FindById(id);
        if (user == null) throw new KeyNotFoundException("User not found.");

        user.IsDeleted = true;
        await _userRepository.Update(user);
    }
}
