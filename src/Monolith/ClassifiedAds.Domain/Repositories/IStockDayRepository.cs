using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockDayRepository : IBaseDapperRepository<StockDay>
    {
        Task<List<StockDay>> GetInStocks(string[] codes, DateTime startDate, DateTime endDate);
    }
}
