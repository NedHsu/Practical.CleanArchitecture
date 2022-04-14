using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetStockFunderScoreQuery : IQuery<IEnumerable<StockFunderScoreDTO>>
    {
        public DateTime StartDate { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFunderScoreQueryHandler : IQueryHandler<GetStockFunderScoreQuery, IEnumerable<StockFunderScoreDTO>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetStockFunderScoreQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public async Task<IEnumerable<StockFunderScoreDTO>> HandleAsync(GetStockFunderScoreQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockFunderRepository.GetStockFunderScore(query.StartDate);
        }
    }
}
