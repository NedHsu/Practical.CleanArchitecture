using ClassifiedAds.CrossCuttingConcerns.OS;
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

        public List<StockEPSDTO> GetEPS(int year, float growthRatio)
        {
            string sql = @"
;WITH t AS (
SELECT *, ROW_NUMBER() OVER (PARTITION BY StockCode ORDER BY Year) n
FROM StockEPS)
SELECT t.StockCode, t.EPS, p.EPS P_EPS, t.UpdatedAt, t.Year, p.Year P_Year, 
	CASE WHEN p.EPS = 0 THEN 0 ELSE t.EPS / p.EPS END GrowthRatio into #t
FROM t t
	LEFT JOIN t p ON t.StockCode = p.StockCode AND (p.n + 1) = t.n
WHERE t.Year = @Year

SELECT s.Name, s.Industry, s.ClosePrice, s.TwentyPrice, s.SixtyPrice, t.*,
	CASE WHEN t.EPS = 0 THEN 0 ELSE s.ClosePrice / t.EPS END PE,
	CASE WHEN t.P_EPS = 0 THEN 0 ELSE s.ClosePrice / t.P_EPS END P_PE
FROM #t t
	JOIN Stock s ON t.StockCode = s.Code
WHERE t.GrowthRatio > @GrowthRatio AND t.EPS > 0
ORDER BY PE

DROP TABLE #t
";
            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Year", year },
                { "@GrowthRatio", growthRatio },
            };
            return DbContext.Connection.Query<StockEPSDTO>(sql, param).ToList();
        }

        public StockExtraDTO GetExtra(string code)
        {
            string sql = @"
;WITH t AS (
SELECT *, ROW_NUMBER() OVER (PARTITION BY StockCode ORDER BY Year DESC) n
FROM StockEPS
WHERE StockCode = @Code)
SELECT t.StockCode, t.EPS, p.EPS P_EPS, t.UpdatedAt, t.Year, p.Year P_Year into #t
FROM t t
	LEFT JOIN t p ON t.StockCode = p.StockCode AND p.n = t.n + 1
WHERE t.n = 1

SELECT s.*, t.Year, t.P_Year, t.EPS, t.P_EPS, t.UpdatedAt,
	CASE WHEN t.EPS = 0 THEN 0 ELSE s.ClosePrice / t.EPS END PE,
	CASE WHEN t.P_EPS = 0 THEN 0 ELSE s.ClosePrice / t.P_EPS END P_PE
FROM Stock s
	JOIN #t t ON t.StockCode = s.Code
WHERE s.Code = @Code
ORDER BY PE

DROP TABLE #t
";
            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Code", code },
            };
            return DbContext.Connection.QueryFirstOrDefault<StockExtraDTO>(sql, param);
        }
    }
}
