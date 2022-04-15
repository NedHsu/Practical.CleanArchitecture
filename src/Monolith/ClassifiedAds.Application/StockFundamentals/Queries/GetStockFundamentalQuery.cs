using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockFundamentals.Queries
{
    public class GetStockFundamentalQuery : IQuery<StockFundamental>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockFundamentalQueryHandler : IQueryHandler<GetStockFundamentalQuery, StockFundamental>
    {
        private readonly IBaseDapperRepository<StockFundamental> _stockfundamentalRepository;

        public GetStockFundamentalQueryHandler(IBaseDapperRepository<StockFundamental> stockfundamentalRepository)
        {
            _stockfundamentalRepository = stockfundamentalRepository;
        }

        public async Task<StockFundamental> HandleAsync(GetStockFundamentalQuery query, CancellationToken cancellationToken = default)
        {
            var stockfundamental = await _stockfundamentalRepository.GetAsync(x => x.StockCode == query.Code);

            if (query.ThrowNotFoundIfNull && stockfundamental == null)
            {
                throw new NotFoundException($"StockFundamental {query.Code} not found.");
            }

            return stockfundamental;
        }
    }
}
