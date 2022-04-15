using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockGroupItems.Queries
{
    public class GetStockGroupItemExQuery : IQuery<StockGroupItem>
    {
        public string StockCode { get; set; }
        public Guid GroupId { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockGroupItemExQueryHandler : IQueryHandler<GetStockGroupItemExQuery, StockGroupItem>
    {
        private readonly IBaseDapperRepository<StockGroupItem> _stockgroupitemRepository;

        public GetStockGroupItemExQueryHandler(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository)
        {
            _stockgroupitemRepository = stockgroupitemRepository;
        }

        public async Task<StockGroupItem> HandleAsync(GetStockGroupItemExQuery query, CancellationToken cancellationToken = default)
        {
            var stockgroupitem = await _stockgroupitemRepository.GetAsync(x => x.StockCode == query.StockCode && x.GroupId == query.GroupId);

            if (query.ThrowNotFoundIfNull && stockgroupitem == null)
            {
                throw new NotFoundException($"StockGroupItem {query.StockCode} {query.GroupId} not found.");
            }

            return stockgroupitem;
        }
    }
}
