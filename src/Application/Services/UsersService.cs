using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;

namespace Application.Services;

public class UsersService : IUser
{
    private readonly AppDbContext _db;

    public UsersService(AppDbContext db)
    {
        _db = db;
    }

    public List<User> FindAll()
    {
        var users = _db.Users.ToList();
        if (users.Count == 0) throw new Exception("No users found.");
        return users;
        // var users = new List<User> {
        //     new User { Name = "John", Surname = "Doe" },
        //     new User { Name = "Jane", Surname = "Doe" },
        //     new User { Name = "Jim", Surname = "Beam" },
        //     new User { Name = "Jack", Surname = "Daniels" },
        //     new User { Name = "Johnny", Surname = "Walker" },
        //     new User { Name = "James", Surname = "Bond" },
        //     new User { Name = "Bruce", Surname = "Wayne" },
        //     new User { Name = "Clark", Surname = "Kent" },
        //     new User { Name = "Peter", Surname = "Parker" },
        //     new User { Name = "Tony", Surname = "Stark" }
        // };
        // if (users.Count == 0) throw new Exception("No users found.");

        // return users;
    }
}
