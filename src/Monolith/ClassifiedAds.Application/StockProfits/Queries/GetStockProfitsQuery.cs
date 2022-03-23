using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

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

        public List<StockProfit> Handle(GetStockProfitsQuery query)
        {
            return _stockprofitRepository.GetAll(x => x.StockCode == query.StockCode, " [Date] DESC").Take(12).ToList();
        }
    }
}
