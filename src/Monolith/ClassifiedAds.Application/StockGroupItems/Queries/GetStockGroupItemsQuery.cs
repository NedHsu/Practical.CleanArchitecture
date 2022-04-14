using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockGroupItems.Queries
{
    public class GetStockGroupItemsQuery : IQuery<List<StockGroupItem>>
    {
        public string Code { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockGroupItemsQueryHandler : IQueryHandler<GetStockGroupItemsQuery, List<StockGroupItem>>
    {
        private readonly IBaseDapperRepository<StockGroupItem> _stockgroupitemRepository;

        public GetStockGroupItemsQueryHandler(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository)
        {
            _stockgroupitemRepository = stockgroupitemRepository;
        }

        public async Task<List<StockGroupItem>> HandleAsync(GetStockGroupItemsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _stockgroupitemRepository.GetAllAsync(x => x.StockCode == query.Code)).OrderBy(x => x.Sort).ToList();
        }
    }
}
