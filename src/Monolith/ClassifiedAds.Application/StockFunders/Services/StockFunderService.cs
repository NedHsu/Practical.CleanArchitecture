using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockFunders.Services
{
    public class StockFunderService : DapperCrudService<StockFunder>, IStockFunderService
    {
        public StockFunderService(IBaseDapperRepository<StockFunder> stockfunderRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockfunderRepository, domainEvents)
        {
        }
    }
}
