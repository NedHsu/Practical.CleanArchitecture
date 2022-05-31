using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.WordCustoms.Queries
{
    public class GetWordCustomsQuery : IQuery<List<WordCustom>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordCustomsQueryHandler : IQueryHandler<GetWordCustomsQuery, List<WordCustom>>
    {
        private readonly IBaseDapperRepository<WordCustom> _wordCustomRepository;

        public GetWordCustomsQueryHandler(IBaseDapperRepository<WordCustom> wordCustomRepository)
        {
            _wordCustomRepository = wordCustomRepository;
        }

        public async Task<List<WordCustom>> HandleAsync(GetWordCustomsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _wordCustomRepository.GetAllAsync()).ToList();
        }
    }
}
