using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.WordStatss.Queries
{
    public class GetWordStatssQuery : IQuery<List<WordStats>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordStatssQueryHandler : IQueryHandler<GetWordStatssQuery, List<WordStats>>
    {
        private readonly IBaseDapperRepository<WordStats> _wordStatRepository;

        public GetWordStatssQueryHandler(IBaseDapperRepository<WordStats> wordStatRepository)
        {
            _wordStatRepository = wordStatRepository;
        }

        public async Task<List<WordStats>> HandleAsync(GetWordStatssQuery query, CancellationToken cancellationToken = default)
        {
            return (await _wordStatRepository.GetAllAsync()).ToList();
        }
    }
}
