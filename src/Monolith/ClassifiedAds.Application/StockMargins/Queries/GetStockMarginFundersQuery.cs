using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockMargins.Queries
{
    public class GetStockMarginFundersQuery : IQuery<List<StockMarginFunderDTO>>
    {
        public string StockCode { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockMarginFundersQueryHandler : IQueryHandler<GetStockMarginFundersQuery, List<StockMarginFunderDTO>>
    {
        private readonly IStockMarginRepository _stockmarginRepository;

        public GetStockMarginFundersQueryHandler(IStockMarginRepository stockmarginRepository)
        {
            _stockmarginRepository = stockmarginRepository;
        }

        public async Task<List<StockMarginFunderDTO>> HandleAsync(GetStockMarginFundersQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockmarginRepository.GetWithFunders(query.StockCode, query.StartDate, query.EndDate);
        }
    }
}
