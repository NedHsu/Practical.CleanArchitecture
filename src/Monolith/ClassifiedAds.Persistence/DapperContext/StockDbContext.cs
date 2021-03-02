using ClassifiedAds.Domain.Entities;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using Microsoft.Data.SqlClient;

namespace ClassifiedAds.Persistence.DapperContext
{
    public class StockDbContext : DapperDbContext, IStockDbContext
    {
        private IDapperRepository<stock> _stockRepository;

        public StockDbContext(string connection)
            : base(new SqlConnection(connection))
        {
        }

        public IDapperRepository<stock> stock => _stockRepository ?? (_stockRepository = new DapperRepository<stock>(Connection));

    }
}
