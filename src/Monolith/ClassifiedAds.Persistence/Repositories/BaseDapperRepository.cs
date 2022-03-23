using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using MicroOrm.Dapper.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
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

        public void Add(TEntity entity)
        {
            DapperRepository.Insert(entity);
        }

        public void Update(TEntity entity)
        {
            DapperRepository.Update(entity);
        }

        public int AddOrUpdate(TEntity entity)
        {
            int status = 0;

            var filters = string.Join(" AND ", TableKeys.Select(x => $"{x.Name} = @{x.Name}"));
            var param = TableKeys.Select(x => new KeyValuePair<string, object>($"@{x.Name}", x.GetValue(entity)));
            var sql = $"select (case when exists (select 1 from {TableName} where {filters}) then 1 else 0 end)";

            if (_dbContext.Connection.ExecuteScalar<bool>(sql, param: param))
            {
                DapperRepository.Update(entity);
            }
            else
            {
                DapperRepository.Insert(entity);
                status = 1;
            }

            return status;
        }

        public void Add(IEnumerable<TEntity> entities)
        {
            DapperRepository.BulkInsert(entities);
        }

        public void Delete(TEntity entity)
        {
            DapperRepository.Delete(entity);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return DapperRepository.FindAll();
        }

        public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate)
        {
            return DapperRepository.FindAll(predicate);
        }

        public IEnumerable<TEntity> GetAll<T>(Expression<Func<TEntity, bool>> predicate)
        {
            return DapperRepository.FindAll(predicate);
        }

        public IEnumerable<TEntity> GetAll(Expression<Func<TEntity, bool>> predicate, string orderBy)
        {
            DapperRepository.SetOrderBy(orderBy);

            return DapperRepository.FindAll(predicate);
        }

        public TEntity Get(Expression<Func<TEntity, bool>> predicate)
        {
            return DapperRepository.Find(predicate);
        }

        public TEntity Get(TEntity e)
        {
            return DapperRepository.FindById(e);
        }

        public void Update(IEnumerable<TEntity> entities)
        {
            DapperRepository.BulkUpdate(entities);
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                Delete(entity);
            }
        }

        public PagedResult<TEntity> GetPaged(uint pageIndex, uint pageSize, Expression<Func<TEntity, bool>> predicate, string orderBy)
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

            return new PagedResult<TEntity>(DapperRepository.FindAll(predicate).ToList(), count, pageIndex, pageSize);
        }

        public PagedResult<TDto> GetPaged<TDto>(uint pageIndex, uint pageSize, string sql, IDictionary<string, object> param = null, string orderBy = "")
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

            return new PagedResult<TDto>(_dbContext.Connection.Query<TDto>(sql, param).ToList(), count, pageIndex, pageSize);
        }
    }
}
