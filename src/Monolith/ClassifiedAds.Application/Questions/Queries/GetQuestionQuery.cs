using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Questions.Queries
{
    public class GetQuestionQuery : IQuery<Question>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetQuestionQueryHandler : IQueryHandler<GetQuestionQuery, Question>
    {
        private readonly IBaseDapperRepository<Question> _questionRepository;

        public GetQuestionQueryHandler(IBaseDapperRepository<Question> questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public async Task<Question> HandleAsync(GetQuestionQuery query, CancellationToken cancellationToken = default)
        {
            var question = await _questionRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && question == null)
            {
                throw new NotFoundException($"Question {query.Id} not found.");
            }

            return question;
        }
    }
}
