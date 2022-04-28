using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetStockRevenuesQuery : IQuery<List<StockRevenue>>
    {
        public string StockCode { get; set; }
        public uint Limit { get; set; } = 12;
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
            var result = await _stockrevenueRepository.GetAllAsync(x => x.StockCode == query.StockCode, " [Date] DESC", query.Limit);
            return result.ToList();
        }
    }
}
