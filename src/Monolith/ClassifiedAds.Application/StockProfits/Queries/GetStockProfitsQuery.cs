using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockProfits.Queries
{
    public class GetStockProfitsQuery : IQuery<List<StockProfit>>
    {
        public string StockCode { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockProfitsQueryHandler : IQueryHandler<GetStockProfitsQuery, List<StockProfit>>
    {
        private readonly IBaseDapperRepository<StockProfit> _stockprofitRepository;

        public GetStockProfitsQueryHandler(IBaseDapperRepository<StockProfit> stockprofitRepository)
        {
            _stockprofitRepository = stockprofitRepository;
        }

        public async Task<List<StockProfit>> HandleAsync(GetStockProfitsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _stockprofitRepository.GetAllAsync(x => x.StockCode == query.StockCode, "[Date] DESC", 12)).ToList();
        }
    }
}
