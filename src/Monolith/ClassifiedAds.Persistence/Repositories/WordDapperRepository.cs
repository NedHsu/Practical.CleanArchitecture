﻿using ClassifiedAds.CrossCuttingConcerns.OS;
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

        public async Task<PagedResult<WordStatsDTO>> GetWordStatsPagedAsync(Guid userId, uint pageIndex, uint pageSize, uint intervalMins)
        {
            string sql = @"
SELECT
    w.Id WordId,
    ISNULL(wc.Text, w.Text) Text,
    ISNULL(wc.PartOfSpeach, w.PartOfSpeach) PartOfSpeach,
    ISNULL(wc.Description, w.Description) Description,
    ws.Id,
    Wrong,
    Correct,
    ws.UpdatedDateTime,
    AudioFile,
    wc.Id customId
FROM
    Words w
    LEFT JOIN WordStats ws ON w.Id = ws.WordId AND ws.UserId = @UserId
	LEFT JOIN WordCustoms wc ON w.Id = wc.WordId AND wc.UserId = @UserId
WHERE ws.UpdatedDateTime is NULL OR DATEDIFF(MINUTE, ws.UpdatedDateTime, GETDATE()) > @IntervalMins";

            string orderBy = "ISNULL(ws.Correct, 0) - ISNULL(ws.Wrong, 0)";
            var param = new Dictionary<string, object>()
            {
                { "@UserId", userId },
                { "@IntervalMins", (int)intervalMins },
            };
            return await GetPagedAsync<WordStatsDTO>(pageIndex, pageSize, sql, param, orderBy);
        }

        public async Task<IEnumerable<WordStatsDTO>> GetWordStatsRecentAsync(Guid userId)
        {
            string sql = @"
SELECT
    TOP 20
    ws.Id,
    ws.Wrong,
    ws.Correct,
    w.Id WordId,
    w.Text,
    w.PartOfSpeach,
    w.Description,
	ws.UpdatedDateTime,
    AudioFile
FROM
    WordStats ws
    JOIN Words w ON w.Id = ws.WordId
WHERE
    UserId = @UserId
ORDER BY ws.UpdatedDateTime DESC";

            var param = new Dictionary<string, object>()
            {
                { "@UserId", userId },
            };
            return await DbContext.Connection.QueryAsync<WordStatsDTO>(sql, param);
        }
    }
}
