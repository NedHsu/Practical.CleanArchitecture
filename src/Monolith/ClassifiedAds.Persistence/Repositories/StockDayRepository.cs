using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockDayRepository : BaseDapperRepository<StockDay>, IStockDayRepository
    {
        public StockDayRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public async Task<List<StockDay>> GetInStocks(string[] codes, DateTime startDate, DateTime endDate)
        {
            string sql = @"
SELECT * 
FROM StockDay
WHERE Date BETWEEN @StartDate AND @EndDate AND StockCode IN @Codes
ORDER BY Date
";

            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Codes", codes },
                { "@StartDate", startDate },
                { "@EndDate", endDate },
            };

            return (await DbContext.Connection.QueryAsync<StockDay>(sql, param)).ToList();
        }
    }
}
