using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.WordStatss.Queries
{
    public class GetWordStatsQuery : IQuery<WordStats>
    {
        public Guid UserId { get; set; }
        public Guid WordId { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetWordStatsQueryHandler : IQueryHandler<GetWordStatsQuery, WordStats>
    {
        private readonly IBaseDapperRepository<WordStats> _wordStatRepository;

        public GetWordStatsQueryHandler(IBaseDapperRepository<WordStats> wordStatRepository)
        {
            _wordStatRepository = wordStatRepository;
        }

        public async Task<WordStats> HandleAsync(GetWordStatsQuery query, CancellationToken cancellationToken = default)
        {
            var wordStat = await _wordStatRepository.GetAsync(x => x.WordId == query.WordId && x.UserId == query.UserId);

            if (query.ThrowNotFoundIfNull && wordStat == null)
            {
                throw new NotFoundException($"WordStat {query.WordId} not found.");
            }

            return wordStat;
        }
    }
}
