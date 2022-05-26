using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordPagedQuery : IQuery<PagedResult<Word>>
    {
        public uint PageSize { get; set; } = 100;

        public uint PageIndex { get; set; } = 1;
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWordPagedQueryHandler : IQueryHandler<GetWordPagedQuery, PagedResult<Word>>
    {
        private readonly IRepository<Word, Guid> _wordRepository;

        public GetWordPagedQueryHandler(IRepository<Word, Guid> wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<PagedResult<Word>> HandleAsync(GetWordPagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _wordRepository.GetPagedAsync(query.PageIndex, query.PageSize);
        }
    }
}
