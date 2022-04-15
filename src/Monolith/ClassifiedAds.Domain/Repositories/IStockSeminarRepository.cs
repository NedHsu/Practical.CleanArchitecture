using ClassifiedAds.Domain.DTOs;
using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockSeminarRepository : IBaseDapperRepository<StockSeminar>
    {
        Task<PagedResult<StockSeminarDTO>> GetWithStockInfo(DateTime startDate, DateTime endDate, uint pageIndex, uint pageSize);
    }
}
