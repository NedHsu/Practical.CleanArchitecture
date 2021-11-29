using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockNews.Queries
{
    public class GetStockNewsQuery : IQuery<List<StockNew>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockNewsQueryHandler : IQueryHandler<GetStockNewsQuery, List<StockNew>>
    {
        private readonly IBaseDapperRepository<StockNew> _stockNewRepository;

        public GetStockNewsQueryHandler(IBaseDapperRepository<StockNew> stockNewRepository)
        {
            _stockNewRepository = stockNewRepository;
        }

        public List<StockNew> Handle(GetStockNewsQuery query)
        {
            return _stockNewRepository.GetAll().ToList();
        }
    }
}
