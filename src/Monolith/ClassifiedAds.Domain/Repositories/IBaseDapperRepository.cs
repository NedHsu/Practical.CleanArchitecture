using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IBaseDapperRepository<TEntity>
    {
        void Add(TEntity entity);

        void Update(TEntity entity);

        int AddOrUpdate(TEntity entity);

        void Add(IEnumerable<TEntity> entity);

        void Update(IEnumerable<TEntity> entity);

        void Delete(TEntity entity);

        void Delete(IEnumerable<TEntity> entities);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate);

        IEnumerable<TEntity> GetAll<T>(Expression<Func<TEntity, bool>> predicate);

        IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, string orderBy);

        TEntity Get(Expression<Func<TEntity, bool>> predicate);

        PagedResult<TEntity> GetPaged(uint pageIndex, uint pageSize, Expression<Func<TEntity, bool>> predicate, string orderBy);
    }
}
