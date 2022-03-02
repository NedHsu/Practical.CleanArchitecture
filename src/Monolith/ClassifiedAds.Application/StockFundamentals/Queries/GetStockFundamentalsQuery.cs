using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockFundamentals.Queries
{
    public class GetStockFundamentalsQuery : IQuery<List<StockFundamental>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFundamentalsQueryHandler : IQueryHandler<GetStockFundamentalsQuery, List<StockFundamental>>
    {
        private readonly IBaseDapperRepository<StockFundamental> _stockfundamentalRepository;

        public GetStockFundamentalsQueryHandler(IBaseDapperRepository<StockFundamental> stockfundamentalRepository)
        {
            _stockfundamentalRepository = stockfundamentalRepository;
        }

        public List<StockFundamental> Handle(GetStockFundamentalsQuery query)
        {
            return _stockfundamentalRepository.GetAll().ToList();
        }
    }
}
