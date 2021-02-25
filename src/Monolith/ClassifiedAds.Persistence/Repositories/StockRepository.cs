using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System.Linq;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockRepository<T> : IStockRepository<T>
        where T : class
    {
        private readonly IStockDbContext _dbContext;
        private readonly IDateTimeProvider _dateTimeProvider;

        public StockRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
        {
            _dbContext = dbContext;
            _dateTimeProvider = dateTimeProvider;
        }

        public void AddOrUpdate(T entity)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<T> GetAll()
        {
            throw new System.NotImplementedException();
        }

        public IQueryable<T> Get()
        {
            throw new System.NotImplementedException();
        }
    }
}
