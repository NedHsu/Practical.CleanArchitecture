using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Services
{
    public class StockGroupItemService : DapperCrudService<StockGroupItem>, IStockGroupItemService
    {
        public StockGroupItemService(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockgroupitemRepository, domainEvents)
        {
        }

        public async Task UpdateAsync(string stockCode, List<Guid> groupIds)
        {
            var oldGroupItems = (await Repository.GetAllAsync(x => x.StockCode == stockCode)).Select(x => new { x.Id, x.GroupId });
            var oldGroupIds = new HashSet<Guid>(oldGroupItems.Select(x => x.GroupId));
            var newGroupIds = new HashSet<Guid>(groupIds);

            var newItems = newGroupIds.Where(x => !oldGroupIds.Contains(x))
                .Select(x => new StockGroupItem { GroupId = x, Id = Guid.NewGuid(), StockCode = stockCode });

            var deletedItems = oldGroupItems.Where(x => !newGroupIds.Contains(x.GroupId))
                .Select(x => new StockGroupItem { Id = x.Id });

            if (deletedItems.Any())
            {
                await Repository.DeleteAsync(deletedItems);
            }

            if (newItems.Any())
            {
                await Repository.AddAsync(newItems);
            }
        }

        public async Task UpdateAsync(Guid groupId, List<string> stockCodes)
        {
            var oldGroupItems = (await Repository.GetAllAsync(x => x.GroupId == groupId && stockCodes.Contains(x.StockCode))).Select(x => new { x.Id, x.StockCode });
            var oldStocks = new HashSet<string>(oldGroupItems.Select(x => x.StockCode));
            var newStocks = new HashSet<string>(stockCodes);

            var newItems = newStocks.Where(x => !oldStocks.Contains(x))
                .Select(x => new StockGroupItem { GroupId = groupId, Id = Guid.NewGuid(), StockCode = x });

            var deletedItems = oldGroupItems.Where(x => !newStocks.Contains(x.StockCode))
                .Select(x => new StockGroupItem { Id = x.Id });

            if (deletedItems.Any())
            {
                await Repository.DeleteAsync(deletedItems);
            }

            if (newItems.Any())
            {
                await Repository.AddAsync(newItems);
            }
        }

        public async Task AddAsync(Guid groupId, List<string> stockCodes)
        {
            var oldStocks = new HashSet<string>((await Repository.GetAllAsync(x => x.GroupId == groupId && stockCodes.Contains(x.StockCode))).Select(x => x.StockCode));
            var newStocks = new HashSet<string>(stockCodes);

            var newItems = newStocks.Where(x => !oldStocks.Contains(x))
                .Select(x => new StockGroupItem { GroupId = groupId, Id = Guid.NewGuid(), StockCode = x });

            if (newItems.Any())
            {
                await Repository.AddAsync(newItems);
            }
        }
    }
}
