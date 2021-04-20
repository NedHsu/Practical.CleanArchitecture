using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using MicroOrm.Dapper.Repositories;
using MicroOrm.Dapper.Repositories.DbContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Persistence.DapperContext
{
    public interface IStockDbContext : IDapperDbContext, IUnitOfWork
    {
        IDapperRepository<Stock> Stock { get; }
        IDapperRepository<StockNote> StockNote { get; }
        IDapperRepository<StockGroup> StockGroup { get; }
        IDapperRepository<StockGroupItem> StockGroupItem { get; }
        IDapperRepository<StockFunder> StockFunder { get; }
        IDapperRepository<StockRevenue> StockRevenue { get; }
        IDapperRepository<StockDay> StockDay { get; }
    }
}
