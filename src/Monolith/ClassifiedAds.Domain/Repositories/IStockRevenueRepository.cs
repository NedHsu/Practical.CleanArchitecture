using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Queries;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockRevenueRepository : IBaseDapperRepository<StockRevenue>
    {
        Task<List<StockRevenueDTO>> GetTopRevenues();
        Task<PagedResult<StockRevenueDTO>> GetpRevenuePaged(StockRevenueQuery query);
    }
}
