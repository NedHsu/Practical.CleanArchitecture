using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;

namespace ClassifiedAds.Persistence.DapperContext
{
    public class StockDbContext : DapperDbContext, IStockDbContext
    {
        private Dictionary<string, object> _repositorys;
        private IDbTransaction trans;

        public StockDbContext(string connection)
            : base(new SqlConnection(connection))
        {
            _repositorys = new Dictionary<string, object>();
        }

        public IDapperRepository<TEntity> GetRepository<TEntity>()
            where TEntity : class
        {
            var repositoryKey = typeof(TEntity).Name;
            object instance;
            if (_repositorys.TryGetValue(repositoryKey, out instance))
            {
                return (IDapperRepository<TEntity>)instance;
            }

            var newInstance = new DapperRepository<TEntity>(Connection);
            _repositorys.Add(repositoryKey, newInstance);
            return newInstance;
        }

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
