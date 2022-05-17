using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordsQuery : IQuery<List<Word>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordsQueryHandler : IQueryHandler<GetWordsQuery, List<Word>>
    {
        private readonly IBaseDapperRepository<Word> _wordRepository;

        public GetWordsQueryHandler(IBaseDapperRepository<Word> wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<List<Word>> HandleAsync(GetWordsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _wordRepository.GetAllAsync()).ToList();
        }
    }
}
