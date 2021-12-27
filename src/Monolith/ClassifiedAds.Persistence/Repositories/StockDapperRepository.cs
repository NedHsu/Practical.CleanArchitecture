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
    public class StockDapperRepository : BaseDapperRepository<Stock>, IStockDapperRepository
    {
        public StockDapperRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<Stock> GetByGroupId(Guid groupId)
        {
            string sql = @"
SELECT s.* 
FROM StockGroupItem i
	JOIN stock s ON i.StockCode = s.code
WHERE i.GroupId = @GroupId
ORDER BY i.Sort, s.code
";
            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@GroupId", groupId },
            };
            return DbContext.Connection.Query<Stock>(sql, param).ToList();
        }

        public List<string> GetAllIndustry()
        {
            string sql = @"
SELECT Industry
FROM Stock
WHERE Industry <> ''
GROUP BY Industry
ORDER BY COUNT(0) DESC";

            return DbContext.Connection.Query<string>(sql).ToList();
        }

        public Dictionary<string, string> GetStocksName(List<string> codes)
        {
            string sql = @"
SELECT Code, Name
FROM Stock
WHERE Code IN @Codes
";
            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Codes", codes },
            };

            return DbContext.Connection.Query<Stock>(sql, param).ToDictionary(x => x.Code, x => x.Name);
        }

        public StockFetchDatesDTO GetStockFetchDates()
        {
            string sql = @"
SELECT 
	(SELECT MAX(Date) FROM StockDay) StockDay,
	(SELECT MAX(Date) FROM StockFunder) StockFunder,
	(SELECT MAX(Date) FROM StockRevenue) StockRevenue,
	(SELECT MAX(Date) FROM StockFundamental) StockFundamental,
	(SELECT MAX(Date) FROM StockMargin) StockMargin
";

            return DbContext.Connection.QueryFirst<StockFetchDatesDTO>(sql);
        }
    }
}
