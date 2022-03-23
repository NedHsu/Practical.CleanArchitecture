using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetIndustrysQuery : IQuery<List<string>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetIndustryQueryHandler : IQueryHandler<GetIndustrysQuery, List<string>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetIndustryQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public List<string> Handle(GetIndustrysQuery query)
        {
            return _stockRepository.GetAllIndustry();
        }
    }
}