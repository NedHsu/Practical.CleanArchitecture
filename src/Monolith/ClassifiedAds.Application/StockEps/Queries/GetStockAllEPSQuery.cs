using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockEPSs.Queries
{
    public class GetStockAllEPSQuery : IQuery<List<StockEPS>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockAllEPSQueryHandler : IQueryHandler<GetStockAllEPSQuery, List<StockEPS>>
    {
        private readonly IBaseDapperRepository<StockEPS> _stockEpRepository;

        public GetStockAllEPSQueryHandler(IBaseDapperRepository<StockEPS> stockEpRepository)
        {
            _stockEpRepository = stockEpRepository;
        }

        public async Task<List<StockEPS>> HandleAsync(GetStockAllEPSQuery query, CancellationToken cancellationToken = default)
        {
            return (await _stockEpRepository.GetAllAsync()).ToList();
        }
    }
}
