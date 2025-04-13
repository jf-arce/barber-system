using Domain.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories.Base;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly AppDbContext _dbContext;
    private readonly DbSet<T> _dbSet;

    public GenericRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<T>();
    }

    public virtual async Task<List<T>> FindAll()
    {
        return await _dbSet.ToListAsync();
    }

    public virtual async Task<T?> FindById(object id)
    {
        return await _dbSet.FindAsync(id);
    }

    public virtual async Task Create(T obj)
    {
        await _dbSet.AddAsync(obj);
        await _dbContext.SaveChangesAsync();
    }

    public virtual async Task Update(T obj)
    {
        _dbSet.Update(obj);
        await _dbContext.SaveChangesAsync();
    }

    public virtual async Task Delete(T obj)
    {
        _dbSet.Remove(obj);
        await _dbContext.SaveChangesAsync();
    }
}