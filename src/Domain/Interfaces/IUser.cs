using Domain.Entities;

namespace Domain.Interfaces;

public interface IUser
{
    List<User> FindAll(); 
}
