using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using MicroOrm.Dapper.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;
using System.Reflection;

namespace ClassifiedAds.Persistence.Repositories
{
    public class BaseDapperRepository<TEntity> : IBaseDapperRepository<TEntity>
        where TEntity : class
    {
        private readonly IStockDbContext _dbContext;
        private readonly IDateTimeProvider _dateTimeProvider;

        protected string TableName { get; }
        protected PropertyInfo[] TableKeys { get; }

        protected IDapperRepository<TEntity> DapperRepository { get; }

        public BaseDapperRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            _dbContext = dbContext;
            _dateTimeProvider = dateTimeProvider;

            var t = typeof(TEntity);
            TableName = t.GetCustomAttributesData().FirstOrDefault(x => x.AttributeType == typeof(TableAttribute))?.ConstructorArguments[0].Value.ToString() ?? t.Name;
            TableKeys = t.GetProperties().Where(p => p.IsDefined(typeof(KeyAttribute), false)).ToArray();
            DapperRepository = _dbContext.GetRepository<TEntity>();
        }

        protected IStockDbContext DbContext => _dbContext;

        public async Task AddAsync(TEntity entity)
        {
            await DapperRepository.InsertAsync(entity);
        }

        public async Task UpdateAsync(TEntity entity)
        {
            await DapperRepository.UpdateAsync(entity);
        }

        public async Task<int> AddOrUpdateAsync(TEntity entity)
        {
            int status = 0;

            var filters = string.Join(" AND ", TableKeys.Select(x => $"{x.Name} = @{x.Name}"));
            var param = TableKeys.Select(x => new KeyValuePair<string, object>($"@{x.Name}", x.GetValue(entity)));
            var sql = $"select (case when exists (select 1 from {TableName} where {filters}) then 1 else 0 end)";

            if (await _dbContext.Connection.ExecuteScalarAsync<bool>(sql, param: param))
            {
                await DapperRepository.UpdateAsync(entity);
            }
            else
            {
                await DapperRepository.InsertAsync(entity);
                status = 1;
            }

            return status;
        }

        public async Task AddAsync(IEnumerable<TEntity> entities)
        {
            await DapperRepository.BulkInsertAsync(entities);
        }

        public async Task DeleteAsync(TEntity entity)
        {
            await DapperRepository.DeleteAsync(entity);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await DapperRepository.FindAllAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await DapperRepository.FindAllAsync(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync<T>(Expression<Func<TEntity, bool>> predicate)
        {
            return await DapperRepository.FindAllAsync(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate, string orderBy, uint? limit, uint? offset)
        {
            DapperRepository.SetOrderBy(orderBy);
            if (limit.HasValue)
            {
                DapperRepository.SetLimit(limit.Value, offset, false);
            }

            return await DapperRepository.FindAllAsync(predicate);
        }

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await DapperRepository.FindAsync(predicate);
        }

        public async Task<TEntity> GetAsync(TEntity e)
        {
            return await DapperRepository.FindByIdAsync(e);
        }

        public async Task UpdateAsync(IEnumerable<TEntity> entities)
        {
            await DapperRepository.BulkUpdateAsync(entities);
        }

        public async Task DeleteAsync(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                await DeleteAsync(entity);
            }
        }

        public async Task<PagedResult<TEntity>> GetPaged(uint pageIndex, uint pageSize, Expression<Func<TEntity, bool>> predicate, string orderBy)
        {
            uint count = (uint)DapperRepository.Count(predicate);
            if (pageSize > 0)
            {
                DapperRepository.SetLimit(pageSize, (pageIndex - 1) * pageSize);
            }

            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                DapperRepository.SetOrderBy(orderBy);
            }

            return new PagedResult<TEntity>((await DapperRepository.FindAllAsync(predicate)).ToList(), count, pageIndex, pageSize);
        }

        public async Task<PagedResult<TDto>> GetPagedAsync<TDto>(uint pageIndex, uint pageSize, string sql, IDictionary<string, object> param = null, string orderBy = "")
        {
            uint count = _dbContext.Connection.ExecuteScalar<uint>($"SELECT COUNT(0) FROM ({sql}) as c", param);

            if (!string.IsNullOrWhiteSpace(orderBy))
            {
                sql = $"{sql} {orderBy}";
            }

            if (pageSize > 0)
            {
                sql = $"{sql} OFFSET {(pageIndex - 1) * pageSize} ROWS FETCH NEXT {pageSize} ROWS ONLY;";
            }

            return new PagedResult<TDto>((await _dbContext.Connection.QueryAsync<TDto>(sql, param)).ToList(), count, pageIndex, pageSize);
        }
    }
}
