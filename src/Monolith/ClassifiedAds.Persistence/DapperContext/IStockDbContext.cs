using ClassifiedAds.Domain.Repositories;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;

namespace ClassifiedAds.Persistence.DapperContext
{
    public interface IStockDbContext : IDapperDbContext, IUnitOfWork
    {
        IDapperRepository<TEntity> GetRepository<TEntity>()
            where TEntity : class;
    }
}
