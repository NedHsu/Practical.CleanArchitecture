using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IBaseDapperRepository<TEntity>
    {
        public void Add(TEntity entity);

        public void Update(TEntity entity);

        public int AddOrUpdate(TEntity entity);

        public void Add(IEnumerable<TEntity> entity);

        public void Update(IEnumerable<TEntity> entity);

        public void Delete(TEntity entity);

        public void Delete(IEnumerable<TEntity> entities);

        public IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate);

        TEntity Get(Expression<Func<TEntity, bool>> predicate);
    }
}
