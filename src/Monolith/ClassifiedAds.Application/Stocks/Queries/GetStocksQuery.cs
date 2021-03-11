using System;
using System.Collections.Generic;
using System.Linq;
using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries {
    public class GetStocksQuery : IQuery<List<Stock>> {
        public string Code { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksQueryHandler : IQueryHandler<GetStocksQuery, List<Stock>> {
        private readonly IBaseDapperRepository<Stock> _stockRepository;

        public GetStocksQueryHandler(IBaseDapperRepository<Stock> stockRepository) {
            _stockRepository = stockRepository;
        }

        public List<Stock> Handle(GetStocksQuery query) {
            return _stockRepository.GetAll().ToList();
        }
    }
}