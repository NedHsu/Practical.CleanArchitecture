using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockGroupItems.Services
{
    public class StockGroupItemService : DapperCrudService<StockGroupItem>, IStockGroupItemService
    {
        public StockGroupItemService(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockgroupitemRepository, domainEvents)
        {
        }

        public void Update(string stockCode, List<Guid> groupIds)
        {
            var oldGroupIds = new HashSet<Guid>(Repository.GetAll(x => x.StockCode == stockCode).Select(x => x.GroupId));
            var newGroupIds = new HashSet<Guid>(groupIds);

            var newItems = newGroupIds.Where(x => !oldGroupIds.Contains(x))
                .Select(x => new StockGroupItem { GroupId = x, Id = Guid.NewGuid(), StockCode = stockCode });

            var deletedItems = oldGroupIds.Where(x => !newGroupIds.Contains(x))
                .Select(x => new StockGroupItem { Id = x });

            if (deletedItems.Any())
            {
                Repository.Delete(deletedItems);
            }

            if (newItems.Any())
            {
                Repository.Add(newItems);
            }
        }
    }
}
