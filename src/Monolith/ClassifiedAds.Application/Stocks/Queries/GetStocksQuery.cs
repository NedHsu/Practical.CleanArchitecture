using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStocksQuery : IQuery<List<Stock>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksQueryHandler : IQueryHandler<GetStocksQuery, List<Stock>>
    {
        private readonly IRepository<Stock, Guid> _stockRepository;

        public GetStocksQueryHandler(IRepository<Stock, Guid> stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public List<Stock> Handle(GetStocksQuery query)
        {
            return _stockRepository.GetAll().ToList();
        }
    }
}
