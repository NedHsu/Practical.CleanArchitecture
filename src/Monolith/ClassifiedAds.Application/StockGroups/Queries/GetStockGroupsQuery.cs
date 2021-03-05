using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockGroups.Queries
{
    public class GetStockGroupsQuery : IQuery<List<StockGroup>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockGroupsQueryHandler : IQueryHandler<GetStockGroupsQuery, List<StockGroup>>
    {
        private readonly IStockRepository<StockGroup> _stockgroupRepository;

        public GetStockGroupsQueryHandler(IStockRepository<StockGroup> stockgroupRepository)
        {
            _stockgroupRepository = stockgroupRepository;
        }

        public List<StockGroup> Handle(GetStockGroupsQuery query)
        {
            return _stockgroupRepository.GetAll().ToList();
        }
    }
}
