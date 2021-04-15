using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;

namespace ClassifiedAds.Persistence.Repositories
{
    public class StockDayRepository : BaseDapperRepository<StockDay>, IStockDayRepository
    {
        public StockDayRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<StockDay> GetInStocks(string[] codes, DateTime startDate, DateTime endDate)
        {
            string sql = @"

";

            Dictionary<string, object> param = new Dictionary<string, object>()
            {
                { "@Codes", codes },
                { "@StartDate", startDate },
                { "@EndDate", endDate },
            };

            return DbContext.Connection.Query<StockDay>(sql, param).ToList();
        }
    }
}
