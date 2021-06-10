﻿using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using ClassifiedAds.Domain.DTOs;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockRevenueRepository : BaseDapperRepository<StockRevenue>, IStockRevenueRepository
    {
        public StockRevenueRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<StockRevenueDTO> GetTopRevenues()
        {
            string sql = @"
SELECT TOP 100 
	s.name, 
    s.closePrice,
	r.* 
FROM StockRevenue r 
	JOIN Stock s ON r.StockCode = s.Code
ORDER BY Date DESC, YoY DESC
";
            return DbContext.Connection.Query<StockRevenueDTO>(sql).ToList();
        }
    }
}
