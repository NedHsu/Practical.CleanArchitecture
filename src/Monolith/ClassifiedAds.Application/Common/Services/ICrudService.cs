using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public interface ICrudService<T>
        where T : AggregateRoot<Guid>
    {
        Task<List<T>> GetAsync();

        Task<T> GetByIdAsync(Guid guid);

        Task AddOrUpdateAsync(T entity);

        Task DeleteAsync(T entity);

        Task DeleteAsync(List<T> entites);

        Task CUDAsync<T2>(List<T2> entities)
            where T2 : T, ICommandAction;
    }
}
