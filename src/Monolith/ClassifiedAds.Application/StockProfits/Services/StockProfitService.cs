using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockProfits.Services
{
    public class StockProfitService : DapperCrudService<StockProfit>, IStockProfitService
    {
        public StockProfitService(IBaseDapperRepository<StockProfit> stockprofitRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockprofitRepository, domainEvents)
        {
        }
    }
}
