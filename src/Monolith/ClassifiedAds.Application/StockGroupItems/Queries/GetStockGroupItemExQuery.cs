using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
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

        public StockGroupItem Handle(GetStockGroupItemExQuery query)
        {
            var stockgroupitem = _stockgroupitemRepository.Get(x => x.StockCode == query.StockCode && x.GroupId == query.GroupId);

            if (query.ThrowNotFoundIfNull && stockgroupitem == null)
            {
                throw new NotFoundException($"StockGroupItem {query.StockCode} {query.GroupId} not found.");
            }

            return stockgroupitem;
        }
    }
}
