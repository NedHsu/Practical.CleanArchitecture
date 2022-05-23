using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using ClassifiedAds.Persistence.DapperContext;
using Dapper;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Persistence.Repositories
{
    public class WordDapperRepository : BaseDapperRepository<Word>, IWordRepository
    {
        public WordDapperRepository(IStockDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public async Task<PagedResult<WordStatsDTO>> GetWordStatsPagedAsync(Guid userId, uint pageIndex, uint pageSize)
        {
            string sql = @"
SELECT
    w.[Id],
    [Text],
    [PartOfSpeach],
    [Description],
    [Wrong],
    [Correct],
    [UpdatedDateTime]
FROM
    Words w
    LEFT JOIN WordStats ws ON w.Id = ws.WordId AND ws.UserId = @UserId";

            string orderBy = "ORDER BY ISNULL(ws.Correct, 0) - ISNULL(ws.Wrong, 0)";
            var param = new Dictionary<string, object>()
            {
                { "@UserId", userId },
            };
            return await GetPagedAsync<WordStatsDTO>(pageIndex, pageSize, sql, param, orderBy);
        }
    }
}
