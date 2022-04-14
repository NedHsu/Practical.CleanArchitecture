﻿using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IBaseDapperRepository<TEntity>
    {
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

        Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate, string orderBy);

        Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate);

        Task<PagedResult<TEntity>> GetPaged(uint pageIndex, uint pageSize, Expression<Func<TEntity, bool>> predicate, string orderBy);
    }
}
