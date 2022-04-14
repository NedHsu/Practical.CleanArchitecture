using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Services
{
    public interface IStockGroupItemService : IDapperCrudService<StockGroupItem>
    {
        Task UpdateAsync(string stockCode, List<Guid> groupIds);
        Task UpdateAsync(Guid groupId, List<string> stockCodes);
        Task AddAsync(Guid groupId, List<string> stockCodes);
    }
}
