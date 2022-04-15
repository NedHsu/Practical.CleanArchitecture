using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockGroupItems.Queries
{
    public class GetStockGroupItemQuery : IQuery<StockGroupItem>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockGroupItemQueryHandler : IQueryHandler<GetStockGroupItemQuery, StockGroupItem>
    {
        private readonly IBaseDapperRepository<StockGroupItem> _stockgroupitemRepository;

        public GetStockGroupItemQueryHandler(IBaseDapperRepository<StockGroupItem> stockgroupitemRepository)
        {
            _stockgroupitemRepository = stockgroupitemRepository;
        }

        public async Task<StockGroupItem> HandleAsync(GetStockGroupItemQuery query, CancellationToken cancellationToken = default)
        {
            var stockgroupitem = await _stockgroupitemRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && stockgroupitem == null)
            {
                throw new NotFoundException($"StockGroupItem {query.Id} not found.");
            }

            return stockgroupitem;
        }
    }
}
