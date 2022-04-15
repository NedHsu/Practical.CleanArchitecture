using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Queries;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockRevenueRepository : BaseDapperRepository<StockRevenue>, IStockRevenueRepository
    {
        public StockRevenueRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public async Task<List<StockRevenueDTO>> GetTopRevenues()
        {
            string sql = @"
SELECT TOP 100 
	s.name, 
    s.closePrice,
	s.Industry,
	r.* 
FROM StockRevenue r 
	JOIN Stock s ON r.StockCode = s.Code
WHERE r.TotalYoY > 0
ORDER BY Date DESC, r.MoM DESC, r.YoY DESC
";
            return (await DbContext.Connection.QueryAsync<StockRevenueDTO>(sql)).ToList();
        }

        public async Task<PagedResult<StockRevenueDTO>> GetpRevenuePaged(StockRevenueQuery query)
        {
            var filters = "r.TotalYoY > 0";
            var param = new Dictionary<string, object>();
            if (!string.IsNullOrWhiteSpace(query.Industry))
            {
                param.Add("Industry", query.Industry);
                filters += " AND s.Industry = @Industry";
            }

            var sql = @$"
SELECT 
	s.name, 
    s.closePrice,
	s.Industry,
	r.* 
FROM StockRevenue r 
	JOIN Stock s ON r.StockCode = s.Code
WHERE {filters}
";
            var orderby = "ORDER BY Date DESC, r.MoM DESC, r.YoY DESC";
            return await GetPagedAsync<StockRevenueDTO>(query.PageIndex, query.PageSize, sql, param, orderBy: orderby);
        }
    }
}
