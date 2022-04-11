using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Queries;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockRevenueRepository : IBaseDapperRepository<StockRevenue>
    {
        List<StockRevenueDTO> GetTopRevenues();
        PagedResult<StockRevenueDTO> GetpRevenuePaged(StockRevenueQuery query);
    }
}
