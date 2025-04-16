namespace Domain.Repositories.Base

{
    public interface IGenericRepository<T> where T : class
    {
        Task<List<T>> FindAll();
        Task<T?> FindById(object id);
        Task Create(T obj);
        Task Update(T obj);
        Task Delete(T obj);
    }
}