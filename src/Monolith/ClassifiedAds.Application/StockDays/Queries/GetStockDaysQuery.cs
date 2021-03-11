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
        public string StockCode { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
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
            return _stockdayRepository.GetAll(x => x.StockCode == query.StockCode && x.Date >= query.StartDate && x.Date <= query.EndDate)
                                      .ToList();
        }
    }
}
