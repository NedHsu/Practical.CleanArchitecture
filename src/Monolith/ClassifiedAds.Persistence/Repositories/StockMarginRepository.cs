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
    public class StockMarginRepository : BaseDapperRepository<StockMargin>, IStockMarginRepository
    {
        public StockMarginRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<StockMarginFunderDTO> GetWithFunders(string stockCode, DateTime startDate, DateTime endDate)
        {
            string sql = @"
;WITH t AS (
SELECT ISNULL(sf.stockcode, sm.stockcode) StockCode,
       ISNULL(sf.date, sm.date)           Date,
       [foreignbuy],
       [foreignsell],
       [foreignsum],
       [foreignselfbuy],
       [foreignselfsell],
       [foreignselfsum],
       [creditbuy],
       [creditsell],
       [creditsum],
       [selfbuysell],
       [selfbuy],
       [selfsell],
       [selfsum],
       [selfhedgingbuy],
       [selfhedgingsell],
       [selfhedgingsum],
       [total],
       [financingbuy],
       [financingsell],
       [financingback],
       [financingbeforebalance],
       [financingbalance],
       [financinglimit],
       [securitiesbuy],
       [securitiessell],
       [securitiesback],
       [securitiesbeforebalance],
       [securitiesbalance],
       [securitieslimit],
       [offset],
       [remark]
FROM   (SELECT * 
        FROM StockMargin
        WHERE StockCode = @Code AND [Date] BETWEEN @StartDate AND @EndDate) sm
       FULL JOIN 
       (SELECT *
        FROM StockFunder
        WHERE StockCode = @Code AND [Date] BETWEEN @StartDate AND @EndDate) sf
    ON sf.stockcode = sm.stockcode AND sf.date = sm.date)
SELECT * FROM t 
";

            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Code", stockCode },
                { "@StartDate", startDate },
                { "@EndDate", endDate },
            };

            return DbContext.Connection.Query<StockMarginFunderDTO>(sql, param).ToList();
        }
    }
}
