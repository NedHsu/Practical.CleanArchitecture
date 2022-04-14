using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStocksNameQuery : IQuery<Dictionary<string, string>>
    {
        public List<string> StockCodes { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksNameQueryHandler : IQueryHandler<GetStocksNameQuery, Dictionary<string, string>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStocksNameQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<Dictionary<string, string>> HandleAsync(GetStocksNameQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockRepository.GetStocksName(query.StockCodes);
        }
    }
}