using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetTopRevenueStocksQuery : IQuery<List<StockRevenueDTO>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetTopStockRevenuesQueryHandler : IQueryHandler<GetTopRevenueStocksQuery, List<StockRevenueDTO>>
    {
        private readonly IStockRevenueRepository _stockrevenueRepository;

        public GetTopStockRevenuesQueryHandler(IStockRevenueRepository stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public List<StockRevenueDTO> Handle(GetTopRevenueStocksQuery query)
        {
            return _stockrevenueRepository.GetTopRevenues();
        }
    }
}
