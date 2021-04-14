using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetStockFundersQuery : IQuery<List<StockFunder>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFundersQueryHandler : IQueryHandler<GetStockFundersQuery, List<StockFunder>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetStockFundersQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public List<StockFunder> Handle(GetStockFundersQuery query)
        {
            return _stockFunderRepository.GetAll().ToList();
        }
    }
}
