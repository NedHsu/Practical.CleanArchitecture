using System;
using System.Collections.Generic;
using System.Linq;
using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetGroupStocksQuery : IQuery<List<Stock>>
    {
        public Guid GroupId { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetGroupStocksQueryHandler : IQueryHandler<GetGroupStocksQuery, List<Stock>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetGroupStocksQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public List<Stock> Handle(GetGroupStocksQuery query)
        {
            return _stockRepository.GetByGroupId(query.GroupId);
        }
    }
}