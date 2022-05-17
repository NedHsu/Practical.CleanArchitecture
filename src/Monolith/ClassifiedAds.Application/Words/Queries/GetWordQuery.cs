using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Words.Queries
{
    public class GetWordQuery : IQuery<Word>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetWordQueryHandler : IQueryHandler<GetWordQuery, Word>
    {
        private readonly IBaseDapperRepository<Word> _wordRepository;

        public GetWordQueryHandler(IBaseDapperRepository<Word> wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public async Task<Word> HandleAsync(GetWordQuery query, CancellationToken cancellationToken = default)
        {
            var word = await _wordRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && word == null)
            {
                throw new NotFoundException($"Word {query.Id} not found.");
            }

            return word;
        }
    }
}
