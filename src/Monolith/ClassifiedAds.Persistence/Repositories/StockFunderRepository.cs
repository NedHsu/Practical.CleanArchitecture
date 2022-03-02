using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockFunderRepository : BaseDapperRepository<StockFunder>, IStockFunderRepository
    {
        public StockFunderRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<StockFunderDTO> GetCreditTopBuy()
        {
            var sql = @"
SELECT TOP 30 
	s.name, 
    s.closePrice,
	t.*
FROM   StockFunder t WITH(NOLOCK)
	Join stock s on t.StockCode = s.code
WHERE  t.CreditSum > 0 
       AND t.Date >= DATEADD(DAY, -100, GETDATE())
       AND NOT EXISTS(SELECT * 
                      FROM   StockFunder f WITH(NOLOCK)
                      WHERE  f.StockCode = t.StockCode 
                             AND f.CreditSum > 0 
                             AND f.date <> t.date 
                             AND f.date > Dateadd(day, -20, t.date) 
                             AND f.date < t.date) 
ORDER  BY date DESC, CreditSum DESC
";
            return DbContext.Connection.Query<StockFunderDTO>(sql).ToList();
        }

        public PagedResult<StockFunderDTO> GetCreditBuyPaged(uint pageIndex, uint pageSize)
        {
            var sql = @"
SELECT
	s.name, 
    s.closePrice,
	t.*
FROM   StockFunder t WITH(NOLOCK)
	Join stock s on t.StockCode = s.code
WHERE  t.CreditSum > 0 
       AND t.Date >= DATEADD(DAY, -100, GETDATE())
       AND NOT EXISTS(SELECT * 
                      FROM   StockFunder f WITH(NOLOCK)
                      WHERE  f.StockCode = t.StockCode 
                             AND f.CreditSum > 0 
                             AND f.date <> t.date 
                             AND f.date > Dateadd(day, -20, t.date) 
                             AND f.date < t.date)
";
            var orderby = "ORDER  BY date DESC, CreditSum DESC";
            return GetPaged<StockFunderDTO>(pageIndex, pageSize, sql, orderBy: orderby);
        }

        public List<StockFunderScoreDTO> GetStockFunderScore(DateTime startDate)
        {
            var sql = @"
;WITH f AS (
SELECT TOP 100 StockCode, 
	SUM(CASE WHEN CreditSum > 0 THEN 1 WHEN CreditSum < 0 THEN -10 ELSE 0 END) CreditScore,
	SUM(CASE WHEN ForeignSum > 0 THEN 1 WHEN ForeignSum < 0 THEN -1 ELSE 0 END) ForeignScore
FROM StockFunder
WHERE CreditSum > 0 AND Date > @date
GROUP BY StockCode
ORDER BY creditScore DESC)
SELECT s.Code, s.Name, CreditScore, ForeignScore
FROM Stock s
	JOIN f ON s.Code = f.StockCode";

            var param = new Dictionary<string, object>
            {
                { "@date", startDate },
            };
            return DbContext.Connection.Query<StockFunderScoreDTO>(sql, param).ToList();
        }
    }
}
