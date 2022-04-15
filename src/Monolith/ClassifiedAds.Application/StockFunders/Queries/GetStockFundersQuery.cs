using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetStockFundersQuery : IQuery<List<StockFunder>>
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string StockCode { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFundersQueryHandler : IQueryHandler<GetStockFundersQuery, List<StockFunder>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetStockFundersQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public async Task<List<StockFunder>> HandleAsync(GetStockFundersQuery query, CancellationToken cancellationToken = default)
        {
            return (await _stockFunderRepository.GetAllAsync(x => x.Date >= query.StartDate && x.Date <= query.EndDate && x.StockCode == query.StockCode)).ToList();
        }
    }
}
