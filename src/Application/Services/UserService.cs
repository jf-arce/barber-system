using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _db;

    public UserService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<User>> FindAll()
    {
        if (!await _db.Users.AnyAsync()) throw new Exception("No users found.");

        return await _db.Users.ToListAsync();  
    }

    public async Task<User> FindOne(Guid id)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user == null) throw new KeyNotFoundException("User not found.");
        return user;
    }

    public async Task Create(User user)
    {
        await _db.Users.AddAsync(user);
        await _db.SaveChangesAsync();
    }

    public async Task Update(User user)
    {
        var existingUser = await _db.Users.FindAsync(user.Id);
        if (existingUser == null) throw new KeyNotFoundException("User not found.");

        existingUser.Name = user.Name;
        existingUser.Surname = user.Surname;
        existingUser.Email = user.Email;
        existingUser.Phone = user.Phone;
        existingUser.BirthDate = user.BirthDate;
        existingUser.Gender = user.Gender;

        _db.Users.Update(existingUser);
        await _db.SaveChangesAsync();
    }

    public async Task Delete(string id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) throw new KeyNotFoundException("User not found.");

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
    }
}
