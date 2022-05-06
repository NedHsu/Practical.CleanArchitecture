using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using ClassifiedAds.Domain.Repositories;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using Microsoft.Data.SqlClient;

namespace ClassifiedAds.Persistence.DapperContext
{
    public class StockDbContext : DapperDbContext, IStockDbContext
    {
        private Dictionary<string, object> _repositorys;
        private DbTransaction trans;

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
            throw new NotImplementedException();
        }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        IDisposable IUnitOfWork.BeginTransaction(IsolationLevel isolationLevel)
        {
            trans = (Connection as SqlConnection).BeginTransaction(isolationLevel);
            return trans;
        }

        public async Task<IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, CancellationToken cancellationToken = default)
        {
            trans = await (Connection as SqlConnection).BeginTransactionAsync(isolationLevel, cancellationToken);
            return trans;
        }

        public IDisposable BeginTransaction(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, string lockName = null)
        {
            trans = (Connection as SqlConnection).BeginTransaction(isolationLevel, lockName);
            return trans;
        }

        public async Task<IDisposable> BeginTransactionAsync(IsolationLevel isolationLevel = IsolationLevel.ReadCommitted, string lockName = null, CancellationToken cancellationToken = default)
        {
            trans = await (Connection as SqlConnection).BeginTransactionAsync(isolationLevel, cancellationToken);
            return trans;
        }

        public async Task CommitTransactionAsync(CancellationToken cancellationToken = default)
        {
            await trans.CommitAsync();
        }
    }
}
