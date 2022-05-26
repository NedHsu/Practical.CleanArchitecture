using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordStatsPagedQuery : IQuery<PagedResult<WordStatsDTO>>
    {
        public Guid UserId { get; set; }

        public uint PageSize { get; set; } = 100;

        public uint PageIndex { get; set; } = 1;

        public uint IntervalMins { get; set; } = 30;
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordStatsPagedQueryHandler : IQueryHandler<GetWordStatsPagedQuery, PagedResult<WordStatsDTO>>
    {
        private readonly IWordRepository _wordRepository;

        public GetWordStatsPagedQueryHandler(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<PagedResult<WordStatsDTO>> HandleAsync(GetWordStatsPagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _wordRepository.GetWordStatsPagedAsync(query.UserId, query.PageIndex, query.PageSize, query.IntervalMins);
        }
    }
}
