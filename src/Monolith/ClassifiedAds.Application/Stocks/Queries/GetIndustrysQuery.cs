using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetIndustrysQuery : IQuery<IEnumerable<string>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetIndustryQueryHandler : IQueryHandler<GetIndustrysQuery, IEnumerable<string>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetIndustryQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<IEnumerable<string>> HandleAsync(GetIndustrysQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockRepository.GetAllIndustryAsync();
        }
    }
}