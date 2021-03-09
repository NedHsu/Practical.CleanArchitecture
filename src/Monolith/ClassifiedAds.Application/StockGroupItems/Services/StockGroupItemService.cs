using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockGroupItems.Services
{
    public class StockGroupItemService : DapperCrudService<StockGroupItem>, IStockGroupItemService
    {
        public StockGroupItemService(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockgroupitemRepository, domainEvents)
        {
        }
    }
}
