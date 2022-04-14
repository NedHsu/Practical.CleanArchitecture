using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetCreditStockFundersQuery : IQuery<List<StockFunderDTO>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetCreditStockFundersQueryHandler : IQueryHandler<GetCreditStockFundersQuery, List<StockFunderDTO>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetCreditStockFundersQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public async Task<List<StockFunderDTO>> HandleAsync(GetCreditStockFundersQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockFunderRepository.GetCreditTopBuy();
        }
    }
}
