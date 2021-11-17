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

        public void Update(Guid groupId, List<string> stockCodes)
        {
            var oldGroupItems = Repository.GetAll(x => x.GroupId == groupId && stockCodes.Contains(x.StockCode)).Select(x => new { x.Id, x.StockCode });
            var oldStocks = new HashSet<string>(oldGroupItems.Select(x => x.StockCode));
            var newStocks = new HashSet<string>(stockCodes);

            var newItems = newStocks.Where(x => !oldStocks.Contains(x))
                .Select(x => new StockGroupItem { GroupId = groupId, Id = Guid.NewGuid(), StockCode = x });

            var deletedItems = oldGroupItems.Where(x => !newStocks.Contains(x.StockCode))
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

        public void Add(Guid groupId, List<string> stockCodes)
        {
            var oldStocks = new HashSet<string>(Repository.GetAll(x => x.GroupId == groupId && stockCodes.Contains(x.StockCode)).Select(x => x.StockCode));
            var newStocks = new HashSet<string>(stockCodes);

            var newItems = newStocks.Where(x => !oldStocks.Contains(x))
                .Select(x => new StockGroupItem { GroupId = groupId, Id = Guid.NewGuid(), StockCode = x });

            if (newItems.Any())
            {
                Repository.Add(newItems);
            }
        }
    }
}
