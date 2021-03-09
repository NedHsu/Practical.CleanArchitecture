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
        private IDapperRepository<StockNote> _stockNoteRepository;
        private IDapperRepository<StockGroup> _stockGroupRepository;
        private IDapperRepository<StockGroupItem> _stockGroupItemRepository;
        private IDbTransaction trans;

        public StockDbContext(string connection)
            : base(new SqlConnection(connection))
        {
        }

        public IDapperRepository<stock> stock => _stockRepository ?? (_stockRepository = new DapperRepository<stock>(Connection));
        public IDapperRepository<StockNote> StockNote => _stockNoteRepository ?? (_stockNoteRepository = new DapperRepository<StockNote>(Connection));
        public IDapperRepository<StockGroup> StockGroup => _stockGroupRepository ?? (_stockGroupRepository = new DapperRepository<StockGroup>(Connection));
        public IDapperRepository<StockGroupItem> StockGroupItem => _stockGroupItemRepository ?? (_stockGroupItemRepository = new DapperRepository<StockGroupItem>(Connection));

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
