using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetStockRevenuesQuery : IQuery<List<StockRevenue>>
    {
        public string StockCode { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockRevenuesQueryHandler : IQueryHandler<GetStockRevenuesQuery, List<StockRevenue>>
    {
        private readonly IStockRevenueRepository _stockrevenueRepository;

        public GetStockRevenuesQueryHandler(IStockRevenueRepository stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public async Task<List<StockRevenue>> HandleAsync(GetStockRevenuesQuery query, CancellationToken cancellationToken = default)
        {
            var result = await _stockrevenueRepository.GetAllAsync(x => x.StockCode == query.StockCode, " [Date] DESC");
            return result.Take(12).ToList();
        }
    }
}
