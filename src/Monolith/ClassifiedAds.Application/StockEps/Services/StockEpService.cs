using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class StockEpService : DapperCrudService<StockEPS>, IStockEpService
    {
        public StockEpService(IBaseDapperRepository<StockEPS> stockEpRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockEpRepository, domainEvents)
        {
        }
    }
}
