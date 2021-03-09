using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.StockGroups.Queries
{
    public class GetStockGroupQuery : IQuery<StockGroup>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockGroupQueryHandler : IQueryHandler<GetStockGroupQuery, StockGroup>
    {
        private readonly IBaseDapperRepository<StockGroup> _stockgroupRepository;

        public GetStockGroupQueryHandler(IBaseDapperRepository<StockGroup> stockgroupRepository)
        {
            _stockgroupRepository = stockgroupRepository;
        }

        public StockGroup Handle(GetStockGroupQuery query)
        {
            var stockgroup = _stockgroupRepository.Get(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && stockgroup == null)
            {
                throw new NotFoundException($"StockGroup {query.Id} not found.");
            }

            return stockgroup;
        }
    }
}
