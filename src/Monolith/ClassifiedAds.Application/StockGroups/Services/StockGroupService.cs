﻿using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockGroups.Services
{
    public class StockGroupService : DapperCrudService<StockGroup>, IStockGroupService
    {
        public StockGroupService(IBaseDapperRepository<StockGroup> stockgroupRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockgroupRepository, domainEvents)
        {
        }
    }
}
