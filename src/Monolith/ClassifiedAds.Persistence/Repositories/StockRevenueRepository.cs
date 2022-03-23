using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System.Collections.Generic;
using System.Linq;

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
	s.Industry,
	r.* 
FROM StockRevenue r 
	JOIN Stock s ON r.StockCode = s.Code
WHERE r.TotalYoY > 0
ORDER BY Date DESC, r.MoM DESC, r.YoY DESC
";
            return DbContext.Connection.Query<StockRevenueDTO>(sql).ToList();
        }
    }
}
