using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetStockRevenuesQuery : IQuery<List<StockRevenue>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockRevenuesQueryHandler : IQueryHandler<GetStockRevenuesQuery, List<StockRevenue>>
    {
        private readonly IBaseDapperRepository<StockRevenue> _stockrevenueRepository;

        public GetStockRevenuesQueryHandler(IBaseDapperRepository<StockRevenue> stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public List<StockRevenue> Handle(GetStockRevenuesQuery query)
        {
            return _stockrevenueRepository.GetAll().ToList();
        }
    }
}
