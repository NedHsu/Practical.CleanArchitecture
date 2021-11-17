using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroupItems.Services
{
    public interface IStockGroupItemService : IDapperCrudService<StockGroupItem>
    {
        void Update(string stockCode, List<Guid> groupIds);
        void Update(Guid groupId, List<string> stockCodes);
        void Add(Guid groupId, List<string> stockCodes);
    }
}
