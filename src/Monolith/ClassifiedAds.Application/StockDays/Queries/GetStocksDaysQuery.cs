﻿using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockDays.Queries
{
    public class GetStocksDaysQuery : IQuery<List<StockDay>>
    {
        public string[] StockCodes { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksDaysQueryHandler : IQueryHandler<GetStocksDaysQuery, List<StockDay>>
    {
        private readonly IStockDayRepository _stockdayRepository;

        public GetStocksDaysQueryHandler(IStockDayRepository stockdayRepository)
        {
            _stockdayRepository = stockdayRepository;
        }

        public List<StockDay> Handle(GetStocksDaysQuery query)
        {
            return _stockdayRepository.GetInStocks(query.StockCodes, query.StartDate, query.EndDate);
        }
    }
}