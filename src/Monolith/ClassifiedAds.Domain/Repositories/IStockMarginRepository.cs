using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockMarginRepository : IBaseDapperRepository<StockMargin>
    {
        List<StockMarginFunderDTO> GetWithFunders(string stockCode, DateTime startDate, DateTime endDate);
    }
}
