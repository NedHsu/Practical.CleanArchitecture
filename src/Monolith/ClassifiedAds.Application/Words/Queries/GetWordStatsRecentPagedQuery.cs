using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordStatsRecentPagedQuery : IQuery<PagedResult<WordStatsDTO>>
    {
        public Guid UserId { get; set; }

        public uint PageSize { get; set; } = 100;

        public uint PageIndex { get; set; } = 1;

        public bool IsFav { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordStatsRecentPagedQueryHandler : IQueryHandler<GetWordStatsRecentPagedQuery, PagedResult<WordStatsDTO>>
    {
        private readonly IWordRepository _wordRepository;

        public GetWordStatsRecentPagedQueryHandler(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<PagedResult<WordStatsDTO>> HandleAsync(GetWordStatsRecentPagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _wordRepository.GetWordStatsRecentPagedAsync(query.UserId, query.PageIndex, query.PageSize, query.IsFav);
        }
    }
}
