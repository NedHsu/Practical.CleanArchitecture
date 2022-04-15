using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockMarginRepository : IBaseDapperRepository<StockMargin>
    {
        Task<List<StockMarginFunderDTO>> GetWithFunders(string stockCode, DateTime startDate, DateTime endDate);
    }
}
