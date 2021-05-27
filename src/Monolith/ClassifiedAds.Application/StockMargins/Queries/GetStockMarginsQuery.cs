using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockMargins.Queries
{
    public class GetStockMarginsQuery : IQuery<List<StockMargin>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockMarginsQueryHandler : IQueryHandler<GetStockMarginsQuery, List<StockMargin>>
    {
        private readonly IStockMarginRepository _stockmarginRepository;

        public GetStockMarginsQueryHandler(IStockMarginRepository stockmarginRepository)
        {
            _stockmarginRepository = stockmarginRepository;
        }

        public List<StockMargin> Handle(GetStockMarginsQuery query)
        {
            return _stockmarginRepository.GetAll().ToList();
        }
    }
}
