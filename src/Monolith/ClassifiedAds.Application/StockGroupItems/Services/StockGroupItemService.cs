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
            var oldGroupItems = Repository.GetAll(x => x.StockCode == stockCode).Select(x => new { x.Id, x.GroupId });
            var oldGroupIds = new HashSet<Guid>(oldGroupItems.Select(x => x.GroupId));
            var newGroupIds = new HashSet<Guid>(groupIds);

            var newItems = newGroupIds.Where(x => !oldGroupIds.Contains(x))
                .Select(x => new StockGroupItem { GroupId = x, Id = Guid.NewGuid(), StockCode = stockCode });

            var deletedItems = oldGroupItems.Where(x => !newGroupIds.Contains(x.GroupId))
                .Select(x => new StockGroupItem { Id = x.Id });

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
