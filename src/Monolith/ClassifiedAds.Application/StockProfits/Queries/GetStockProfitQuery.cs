using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;

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

        public async Task<StockProfit> HandleAsync(GetStockProfitQuery query, CancellationToken cancellationToken = default)
        {
            var stockprofit = await _stockprofitRepository.GetAsync(x => x.StockCode == query.Code && x.Date == query.Date);

            if (query.ThrowNotFoundIfNull && stockprofit == null)
            {
                throw new NotFoundException($"StockProfit {query.Code} {query.Date} not found.");
            }

            return stockprofit;
        }
    }
}
