using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockSeminarRepository : IBaseDapperRepository<StockSeminar>
    {
        PagedResult<StockSeminarDTO> GetWithStockInfo(DateTime startDate, DateTime endDate, uint pageIndex, uint pageSize);
    }
}
