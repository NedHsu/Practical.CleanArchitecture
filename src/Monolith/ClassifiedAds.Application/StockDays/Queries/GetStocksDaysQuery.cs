using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockDays.Queries
{
    public class GetStocksDaysQuery : IQuery<List<StockDay>>
    {
        public string[] StockCodes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksDaysQueryHandler : IQueryHandler<GetStocksDaysQuery, List<StockDay>>
    {
        private readonly IStockDayRepository _stockdayRepository;

        public GetStocksDaysQueryHandler(IStockDayRepository stockdayRepository)
        {
            _stockdayRepository = stockdayRepository;
        }

        public async Task<List<StockDay>> HandleAsync(GetStocksDaysQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockdayRepository.GetInStocks(query.StockCodes, query.StartDate, query.EndDate);
        }
    }
}
