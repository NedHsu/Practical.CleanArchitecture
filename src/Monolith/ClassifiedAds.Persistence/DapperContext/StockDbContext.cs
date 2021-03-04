using ClassifiedAds.Domain.Entities;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ClassifiedAds.Persistence.DapperContext
{
    public class StockDbContext : DapperDbContext, IStockDbContext
    {
        private IDapperRepository<stock> _stockRepository;
        private IDbTransaction trans;

        public StockDbContext(string connection)
            : base(new SqlConnection(connection))
        {
        }

        public IDapperRepository<stock> stock => _stockRepository ?? (_stockRepository = new DapperRepository<stock>(Connection));

        public void BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted)
        {
            trans = base.BeginTransaction();
        }

        public void CommitTransaction()
        {
            trans.Commit();
        }

        public int SaveChanges()
        {
            throw new System.NotImplementedException();
        }
    }
}
