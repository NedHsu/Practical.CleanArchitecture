using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockDays.Queries
{
    public class GetStockDaysQuery : IQuery<List<StockDay>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockDaysQueryHandler : IQueryHandler<GetStockDaysQuery, List<StockDay>>
    {
        private readonly IBaseDapperRepository<StockDay> _stockdayRepository;

        public GetStockDaysQueryHandler(IBaseDapperRepository<StockDay> stockdayRepository)
        {
            _stockdayRepository = stockdayRepository;
        }

        public List<StockDay> Handle(GetStockDaysQuery query)
        {
            return _stockdayRepository.GetAll().ToList();
        }
    }
}
