using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockSeminars.Queries
{
    public class GetStockSeminarsQuery : IQuery<PagedResult<StockSeminarDTO>>
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public uint PageSize { get; set; }
        public uint PageIndex { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockSeminarsQueryHandler : IQueryHandler<GetStockSeminarsQuery, PagedResult<StockSeminarDTO>>
    {
        private readonly IStockSeminarRepository _stockseminarRepository;

        public GetStockSeminarsQueryHandler(IStockSeminarRepository stockseminarRepository)
        {
            _stockseminarRepository = stockseminarRepository;
        }

        public async Task<PagedResult<StockSeminarDTO>> HandleAsync(GetStockSeminarsQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockseminarRepository.GetWithStockInfo(query.StartDate, query.EndDate, query.PageIndex, query.PageSize);
        }
    }
}
