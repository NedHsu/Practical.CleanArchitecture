using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class StockNewService : DapperCrudService<StockNew>, IStockNewService
    {
        public StockNewService(IBaseDapperRepository<StockNew> stockNewRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockNewRepository, domainEvents)
        {
        }
    }
}
