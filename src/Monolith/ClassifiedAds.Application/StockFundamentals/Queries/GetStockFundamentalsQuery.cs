using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockFundamentals.Queries
{
    public class GetStockFundamentalsQuery : IQuery<IEnumerable<StockFundamental>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFundamentalsQueryHandler : IQueryHandler<GetStockFundamentalsQuery, IEnumerable<StockFundamental>>
    {
        private readonly IBaseDapperRepository<StockFundamental> _stockfundamentalRepository;

        public GetStockFundamentalsQueryHandler(IBaseDapperRepository<StockFundamental> stockfundamentalRepository)
        {
            _stockfundamentalRepository = stockfundamentalRepository;
        }

        public async Task<IEnumerable<StockFundamental>> HandleAsync(GetStockFundamentalsQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockfundamentalRepository.GetAllAsync();
        }
    }
}
