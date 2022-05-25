using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using EntityFrameworkCore.SqlServer.SimpleBulks.BulkDelete;
using EntityFrameworkCore.SqlServer.SimpleBulks.BulkInsert;
using EntityFrameworkCore.SqlServer.SimpleBulks.BulkMerge;
using EntityFrameworkCore.SqlServer.SimpleBulks.BulkUpdate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ClassifiedAds.Persistence.Repositories
{
    public class Repository<T, TKey> : IRepository<T, TKey>
        where T : AggregateRoot<TKey>
    {
        protected readonly AdsDbContext _dbContext;
        private readonly IDateTimeProvider _dateTimeProvider;

        protected DbSet<T> DbSet => _dbContext.Set<T>();

        public IUnitOfWork UnitOfWork
        {
            get
            {
                return _dbContext;
            }
        }

        public Repository(AdsDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            _dbContext = dbContext;
            _dateTimeProvider = dateTimeProvider;
        }

        public async Task AddOrUpdateAsync(T entity, CancellationToken cancellationToken = default)
        {
            if (entity.Id.Equals(default(TKey)))
            {
                entity.CreatedDateTime = _dateTimeProvider.OffsetNow;
                await DbSet.AddAsync(entity, cancellationToken);
            }
            else
            {
                entity.UpdatedDateTime = _dateTimeProvider.OffsetNow;
                DbSet.Update(entity);
            }
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
        }

        public IQueryable<T> GetAll()
        {
            return _dbContext.Set<T>();
        }

        public Task<T1> FirstOrDefaultAsync<T1>(IQueryable<T1> query)
        {
            return query.FirstOrDefaultAsync();
        }

        public Task<T1> SingleOrDefaultAsync<T1>(IQueryable<T1> query)
        {
            return query.SingleOrDefaultAsync();
        }

        public Task<List<T1>> ToListAsync<T1>(IQueryable<T1> query)
        {
            return query.ToListAsync();
        }

        public void BulkInsert(IEnumerable<T> entities)
        {
            _dbContext.BulkInsert(entities);
        }

        public void BulkInsert(IEnumerable<T> entities, Expression<Func<T, object>> columnNamesSelector)
        {
            _dbContext.BulkInsert(entities, columnNamesSelector);
        }

        public void BulkUpdate(IEnumerable<T> entities, Expression<Func<T, object>> columnNamesSelector)
        {
            _dbContext.BulkUpdate(entities, columnNamesSelector);
        }

        public void BulkUpdate(IEnumerable<T> entities, IEnumerable<string> columnNames)
        {
            _dbContext.BulkUpdate(entities, columnNames);
        }

        public void BulkDelete(IEnumerable<T> entities)
        {
            _dbContext.BulkDelete(entities);
        }

        public void BulkMerge(IEnumerable<T> entities, Expression<Func<T, object>> idSelector, Expression<Func<T, object>> updateColumnNamesSelector, Expression<Func<T, object>> insertColumnNamesSelector)
        {
            _dbContext.BulkMerge(entities, idSelector, updateColumnNamesSelector, insertColumnNamesSelector);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<PagedResult<T>> GetPagedAsync(uint pageIndex, uint pageSize, Func<T, object> order = null)
        {
            uint count = (uint)await _dbContext.Set<T>().CountAsync();
            int skip = (int)((pageIndex - 1) * pageSize);
            var quey = _dbContext.Set<T>().AsQueryable();
            if (order != null)
            {
                quey = quey.OrderBy(order).AsQueryable();
            }

            return new PagedResult<T>(await quey.Skip(skip).Take((int)pageSize).ToListAsync(), count, pageIndex, pageSize);
        }
    }
}
