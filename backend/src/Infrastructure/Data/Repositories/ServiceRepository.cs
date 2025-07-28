using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class ServiceRepository : GenericRepository<Service>, IServiceRepository
{
    private readonly AppDbContext _db;
    
    public ServiceRepository(AppDbContext db) : base(db)
    {
        _db = db;
    }
    
    public override async Task<List<Service>> FindAll()
    {
        return await _db.Services
            .Include(s => s.Barbers)
            .ToListAsync();
    }

    public override async Task<Service?> FindById(object id)
    {
        return await _db.Services
            .Include(s => s.Barbers)
            .FirstOrDefaultAsync(s => s.Id == (int)id);
    }
    
    public async Task<List<Service>> FindByMultipleIds(List<int> ids)
    {
        return await _db.Services.Where(s => ids.Contains(s.Id)).ToListAsync();
    }
}