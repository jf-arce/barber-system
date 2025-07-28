using Domain.Entities;
using Domain.Repositories;
using Domain.Repositories.Base;
using Infrastructure.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class BarberRepository : GenericRepository<Barber>, IBarberRepository
{
    private readonly AppDbContext _db;

    public BarberRepository(AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public override async Task<List<Barber>> FindAll()
    {
        return await _db.Barbers
            .Include(b => b.User)
            .Include(b => b.Services)
            .Include(b => b.Languages)
            .Include(b => b.SocialNetworks)
            .ToListAsync();
    }

    public override async Task<Barber?> FindById(object id)
    {
        return await _db.Barbers.Include(b => b.User)
            .Include(b => b.Services)
            .Include(b => b.Languages)
            .Include(b => b.SocialNetworks)
            .FirstOrDefaultAsync(b => b.UserId == (Guid)id);
    }
}