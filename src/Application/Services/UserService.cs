using System.Net;
using Application.Dtos.Users;
using Application.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums.User;
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
        if (users.Count == 0) throw new CustomHttpException(HttpStatusCode.NotFound, "No users found.");
        return users;
    }

    public async Task<User> FindOne(Guid id)
    {
        var user = await _userRepository.FindById(id);
        if (user == null) throw new CustomHttpException(HttpStatusCode.NotFound, "User not found.");
        return user;
    }
    
    public async Task<User> FindByEmail(string email)
    {
        var user = await _userRepository.FindByEmail(email);
        if (user == null) throw new CustomHttpException(HttpStatusCode.NotFound, "User not found.");
        return user;
    }

    public async Task Update(Guid id, UpdateUserDto updateUserDto)
    {
        var existingUser = await _userRepository.FindById(id);
        if (existingUser == null) throw new CustomHttpException(HttpStatusCode.NotFound, "User not found.");

        existingUser.Name = updateUserDto.Name ?? existingUser.Name;
        existingUser.Surname = updateUserDto.Surname ?? existingUser.Surname;
        existingUser.Email = updateUserDto.Email ?? existingUser.Email;
        existingUser.Phone = updateUserDto.Phone ?? existingUser.Phone;
        existingUser.BirthDate = updateUserDto.BirthDate ?? existingUser.BirthDate;
        existingUser.Gender = updateUserDto.Gender ?? existingUser.Gender;

        await _userRepository.Update(existingUser);
    }

    public async Task Delete(Guid id)
    {
        var user = await _userRepository.FindById(id);
        if (user == null) throw new CustomHttpException(HttpStatusCode.NotFound, "User not found.");
        
        user.IsDeleted = true;
        await _userRepository.Update(user);
    }
}
