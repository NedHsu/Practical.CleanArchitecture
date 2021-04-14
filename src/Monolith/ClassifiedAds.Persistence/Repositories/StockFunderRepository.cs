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
    public class StockFunderRepository : BaseDapperRepository<StockFunder>, IStockFunderRepository
    {
        public StockFunderRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<StockFunderDTO> GetCreditTopBuy()
        {
            string sql = @"
SELECT TOP 30 
	s.name, 
	t.*
FROM   StockFunder t WITH(NOLOCK)
	Join stock s on t.StockCode = s.code
WHERE  t.CreditSum > 0 
       AND NOT EXISTS(SELECT * 
                      FROM   StockFunder f WITH(NOLOCK)
                      WHERE  f.StockCode = t.StockCode 
                             AND f.CreditSum > 0 
                             AND f.date <> t.date 
                             AND f.date > Dateadd(day, -20, t.date) 
                             AND f.date < t.date) 
ORDER  BY date DESC 
";
            return DbContext.Connection.Query<StockFunderDTO>(sql).ToList();
        }
    }
}
