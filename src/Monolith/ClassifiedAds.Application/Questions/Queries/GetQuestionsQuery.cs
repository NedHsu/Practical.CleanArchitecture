using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Questions.Queries
{
    public class GetQuestionsQuery : IQuery<List<Question>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetQuestionsQueryHandler : IQueryHandler<GetQuestionsQuery, List<Question>>
    {
        private readonly IBaseDapperRepository<Question> _questionRepository;

        public GetQuestionsQueryHandler(IBaseDapperRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<List<Question>> HandleAsync(GetQuestionsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _questionRepository.GetAllAsync()).ToList();
        }
    }
}
