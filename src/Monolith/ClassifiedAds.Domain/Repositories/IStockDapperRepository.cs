using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockDapperRepository : IBaseDapperRepository<Stock>
    {
        List<Stock> GetByGroupId(Guid groupId);
        List<string> GetAllIndustry();
        Dictionary<string, string> GetStocksName(List<string> codes);
    }
}
