using System;
using System.Data;
using System.Linq.Expressions;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IBaseDapperRepository<TEntity>
    {
        Task<IDbTransaction> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default);

        Task AddAsync(TEntity entity);

        Task UpdateAsync(TEntity entity);

        Task<int> AddOrUpdateAsync(TEntity entity);

        Task AddAsync(IEnumerable<TEntity> entity);

        Task UpdateAsync(IEnumerable<TEntity> entity);

        Task DeleteAsync(TEntity entity);

        Task DeleteAsync(IEnumerable<TEntity> entities);

        Task<IEnumerable<TEntity>> GetAllAsync();

        Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate);

        Task<IEnumerable<TEntity>> GetAllAsync<T>(Expression<Func<TEntity, bool>> predicate);

        Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate, string orderBy, uint? limit = null, uint? offset = null);

        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);

        Task<PagedResult<TEntity>> GetPaged(uint pageIndex, uint pageSize, Expression<Func<TEntity, bool>> predicate, string orderBy);

        IDbTransaction DbTransaction { set; } 
    }
}
