using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockSeminars.Queries
{
    public class GetStockSeminarsQuery : IQuery<List<StockSeminar>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockSeminarsQueryHandler : IQueryHandler<GetStockSeminarsQuery, List<StockSeminar>>
    {
        private readonly IBaseDapperRepository<StockSeminar> _stockseminarRepository;

        public GetStockSeminarsQueryHandler(IBaseDapperRepository<StockSeminar> stockseminarRepository)
        {
            _stockseminarRepository = stockseminarRepository;
        }

        public List<StockSeminar> Handle(GetStockSeminarsQuery query)
        {
            return _stockseminarRepository.GetAll().ToList();
        }
    }
}
