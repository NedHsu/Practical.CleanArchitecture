using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public interface IDapperCrudService<T>
        where T : class
    {
        Task<IList<T>> Get();

        Task AddOrUpdateAsync(T entity);

        Task DeleteAsync(T entity);

        Task AddOrUpdateAsync(List<T> entity);

        Task AddAsync(T entity);

        Task AddAsync(List<T> entity);
        
        Task UpdateAsync(T entity);

        Task UpdateAsync(List<T> entity);

        Task CUDAsync(List<T> entity);
    }
}
