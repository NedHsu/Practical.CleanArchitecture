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

        public List<StockRevenue> Handle(GetStockRevenuesQuery query)
        {
            return _stockrevenueRepository.GetAll(x => x.StockCode == query.StockCode, " [Date] DESC").Take(12).ToList();
        }
    }
}
