using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockNews.Queries
{
    public class GetStockNewQuery : IQuery<StockNew>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockNewQueryHandler : IQueryHandler<GetStockNewQuery, StockNew>
    {
        private readonly IBaseDapperRepository<StockNew> _stockNewRepository;

        public GetStockNewQueryHandler(IBaseDapperRepository<StockNew> stockNewRepository)
        {
            _stockNewRepository = stockNewRepository;
        }

        public async Task<StockNew> HandleAsync(GetStockNewQuery query, CancellationToken cancellationToken = default)
        {
            var stockNew = await _stockNewRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && stockNew == null)
            {
                throw new NotFoundException($"StockNew {query.Id} not found.");
            }

            return stockNew;
        }
    }
}
