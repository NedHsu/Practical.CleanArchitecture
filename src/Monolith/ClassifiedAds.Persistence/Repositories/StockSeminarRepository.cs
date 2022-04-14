using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockSeminarRepository : BaseDapperRepository<StockSeminar>, IStockSeminarRepository
    {
        public StockSeminarRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public async Task<PagedResult<StockSeminarDTO>> GetWithStockInfo(DateTime startDate, DateTime endDate, uint pageIndex, uint pageSize)
        {
            string sql = @"
SELECT 
	s.name,
	ss.* 
FROM StockSeminar ss
	JOIN Stock s ON ss.StockCode = s.Code
WHERE ss.Date >= @StartDate AND ss.Date < @EndDate
";
            string orderBy = "ORDER BY Date DESC";

            var param = new Dictionary<string, object>()
            {
                { "@StartDate", startDate },
                { "@EndDate", endDate.AddDays(1) },
            };
            return await GetPagedAsync<StockSeminarDTO>(pageIndex, pageSize, sql, param, orderBy);
        }
    }
}
