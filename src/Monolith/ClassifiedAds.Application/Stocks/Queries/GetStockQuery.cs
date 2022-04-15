using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockQuery : IQuery<Stock>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockQueryHandler : IQueryHandler<GetStockQuery, Stock>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<Stock> HandleAsync(GetStockQuery query, CancellationToken cancellationToken = default)
        {
            var stock = await _stockRepository.GetAsync(x => x.Code == query.Code);

            if (query.ThrowNotFoundIfNull && stock == null)
            {
                throw new NotFoundException($"Stock {query.Code} not found.");
            }

            return stock;
        }
    }
}
