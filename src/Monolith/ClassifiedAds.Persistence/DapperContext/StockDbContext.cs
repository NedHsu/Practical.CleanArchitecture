using ClassifiedAds.Domain.Repositories;
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

        public void CommitTransaction()
        {
            trans.Commit();
        }

        public int SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        System.IDisposable IUnitOfWork.BeginTransaction(IsolationLevel isolationLevel)
        {
            var transaction = base.BeginTransaction();
            return transaction;
        }

        public async Task<System.IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default)
        {
            return await (Connection as SqlConnection).BeginTransactionAsync(isolationLevel, cancellationToken);
        }

        public System.IDisposable BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, string lockName = null)
        {
            throw new System.NotImplementedException();
        }

        public Task<System.IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, string lockName = null, CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }

        public Task CommitTransactionAsync(CancellationToken cancellationToken = default)
        {
            throw new System.NotImplementedException();
        }
    }
}
