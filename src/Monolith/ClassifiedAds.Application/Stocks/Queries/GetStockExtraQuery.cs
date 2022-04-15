using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockExtraQuery : IQuery<Stock>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockExtraQueryHandler : IQueryHandler<GetStockExtraQuery, Stock>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockExtraQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<Stock> HandleAsync(GetStockExtraQuery query, CancellationToken cancellationToken = default)
        {
            var stock = await _stockRepository.GetExtra(query.Code);

            if (query.ThrowNotFoundIfNull && stock == null)
            {
                throw new NotFoundException($"Stock {query.Code} not found.");
            }

            return stock;
        }
    }
}
