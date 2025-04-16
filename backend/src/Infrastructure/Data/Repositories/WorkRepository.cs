using Domain.Entities;
using Domain.Repositories;
using Infrastructure.Data.Repositories.Base;

namespace Infrastructure.Data.Repositories;

public class WorkRepository : GenericRepository<Work>, IWorkRepository
{
    private readonly AppDbContext _db;

    public WorkRepository(AppDbContext db) : base(db)
    {
        _db = db;
    }
}