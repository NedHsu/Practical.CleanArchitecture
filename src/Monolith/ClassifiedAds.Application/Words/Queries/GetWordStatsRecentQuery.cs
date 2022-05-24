using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordStatsRecentQuery : IQuery<IEnumerable<WordStatsDTO>>
    {
        public Guid UserId { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordStatsRecentQueryHandler : IQueryHandler<GetWordStatsRecentQuery, IEnumerable<WordStatsDTO>>
    {
        private readonly IWordRepository _wordRepository;

        public GetWordStatsRecentQueryHandler(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<IEnumerable<WordStatsDTO>> HandleAsync(GetWordStatsRecentQuery query, CancellationToken cancellationToken = default)
        {
            return await _wordRepository.GetWordStatsRecentAsync(query.UserId);
        }
    }
}
