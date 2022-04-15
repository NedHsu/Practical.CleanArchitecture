using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockGroups.Queries
{
    public class GetStockGroupsQuery : IQuery<List<StockGroup>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockGroupsQueryHandler : IQueryHandler<GetStockGroupsQuery, List<StockGroup>>
    {
        private readonly IBaseDapperRepository<StockGroup> _stockgroupRepository;

        public GetStockGroupsQueryHandler(IBaseDapperRepository<StockGroup> stockgroupRepository)
        {
            _stockgroupRepository = stockgroupRepository;
        }

        public async Task<List<StockGroup>> HandleAsync(GetStockGroupsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _stockgroupRepository.GetAllAsync()).ToList();
        }
    }
}
