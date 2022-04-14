using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockFunderRepository : IBaseDapperRepository<StockFunder>
    {
        Task<List<StockFunderDTO>> GetCreditTopBuy();
        Task<PagedResult<StockFunderDTO>> GetCreditBuyPaged(uint pageIndex, uint pageSize);
        Task<List<StockFunderScoreDTO>> GetStockFunderScore(DateTime startDate);
    }
}
