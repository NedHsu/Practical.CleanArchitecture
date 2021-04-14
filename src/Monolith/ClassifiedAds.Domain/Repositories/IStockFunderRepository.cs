using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockFunderRepository : IBaseDapperRepository<StockFunder>
    {
        List<StockFunderDTO> GetCreditTopBuy();
    }
}
