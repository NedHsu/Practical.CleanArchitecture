using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.StockProfits.Queries
{
    public class GetStockProfitQuery : IQuery<StockProfit>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
        public DateTime Date { get; set; }
    }

    internal class GetStockProfitQueryHandler : IQueryHandler<GetStockProfitQuery, StockProfit>
    {
        private readonly IBaseDapperRepository<StockProfit> _stockprofitRepository;

        public GetStockProfitQueryHandler(IBaseDapperRepository<StockProfit> stockprofitRepository)
        {
            _stockprofitRepository = stockprofitRepository;
        }

        public StockProfit Handle(GetStockProfitQuery query)
        {
            var stockprofit = _stockprofitRepository.Get(x => x.StockCode == query.Code && x.Date == query.Date);

            if (query.ThrowNotFoundIfNull && stockprofit == null)
            {
                throw new NotFoundException($"StockProfit {query.Code} {query.Date} not found.");
            }

            return stockprofit;
        }
    }
}
