using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockFetchDatesQuery : IQuery<StockFetchDatesDTO>
    {
        public List<string> StockCodes { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFetchDatesQueryHandler : IQueryHandler<GetStockFetchDatesQuery, StockFetchDatesDTO>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockFetchDatesQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<StockFetchDatesDTO> HandleAsync(GetStockFetchDatesQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockRepository.GetStockFetchDates();
        }
    }
}