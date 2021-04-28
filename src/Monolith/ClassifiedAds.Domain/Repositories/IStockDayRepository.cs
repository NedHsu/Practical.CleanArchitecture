﻿using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockDayRepository : IBaseDapperRepository<StockDay>
    {
        List<StockDay> GetInStocks(string[] codes, DateTime startDate, DateTime endDate);
    }
}