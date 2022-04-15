using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockFunderRepository : IBaseDapperRepository<StockFunder>
    {
        Task<List<StockFunderDTO>> GetCreditTopBuy();
        Task<PagedResult<StockFunderDTO>> GetCreditBuyPaged(uint pageIndex, uint pageSize);
        Task<List<StockFunderScoreDTO>> GetStockFunderScore(DateTime startDate);
    }
}
