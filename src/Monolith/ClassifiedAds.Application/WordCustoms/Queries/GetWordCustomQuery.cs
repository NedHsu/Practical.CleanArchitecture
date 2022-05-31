using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.WordCustoms.Queries
{
    public class GetWordCustomQuery : IQuery<WordCustom>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetWordCustomQueryHandler : IQueryHandler<GetWordCustomQuery, WordCustom>
    {
        private readonly IBaseDapperRepository<WordCustom> _wordCustomRepository;

        public GetWordCustomQueryHandler(IBaseDapperRepository<WordCustom> wordCustomRepository)
        {
            _wordCustomRepository = wordCustomRepository;
        }

        public async Task<WordCustom> HandleAsync(GetWordCustomQuery query, CancellationToken cancellationToken = default)
        {
            var wordCustom = await _wordCustomRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && wordCustom == null)
            {
                throw new NotFoundException($"WordCustom {query.Id} not found.");
            }

            return wordCustom;
        }
    }
}
