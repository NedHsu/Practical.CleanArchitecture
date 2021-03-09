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
    public class StockDapperRepository : BaseDapperRepository<stock>, IStockDapperRepository
    {
        public StockDapperRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public List<stock> GetByGroupId(Guid groupId)
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
            return DbContext.Connection.Query<stock>(sql, param).ToList();
        }
    }
}
