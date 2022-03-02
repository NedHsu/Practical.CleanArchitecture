using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

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

        public List<StockEPS> Handle(GetStockAllEPSQuery query)
        {
            return _stockEpRepository.GetAll().ToList();
        }
    }
}
