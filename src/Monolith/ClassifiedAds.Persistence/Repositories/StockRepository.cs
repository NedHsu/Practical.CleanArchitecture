using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using MicroOrm.Dapper.Repositories;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockRepository<TEntity> : IStockRepository<TEntity>
        where TEntity : class
    {
        private readonly IStockDbContext _dbContext;
        private readonly IDateTimeProvider _dateTimeProvider;

        protected string TableName { get; }
        protected PropertyInfo[] TableKeys { get; }

        protected IDapperRepository<TEntity> DapperRepository { get; }

        public StockRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            _dbContext = dbContext;
            _dateTimeProvider = dateTimeProvider;

            var t = typeof(TEntity);
            TableName = t.GetCustomAttributesData().FirstOrDefault(x => x.AttributeType == typeof(TableAttribute))?.ConstructorArguments[0].Value.ToString() ?? t.Name;
            TableKeys = t.GetProperties().Where(p => p.IsDefined(typeof(KeyAttribute), false)).ToArray();
            DapperRepository = (IDapperRepository<TEntity>)typeof(IStockDbContext).GetProperty(TableName).GetValue(_dbContext);
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
    }
}
