﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStocksNameQuery : IQuery<Dictionary<string, string>>
    {
        public List<string> StockCodes { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksNameQueryHandler : IQueryHandler<GetStocksNameQuery, Dictionary<string, string>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStocksNameQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public Dictionary<string, string> Handle(GetStocksNameQuery query)
        {
            return _stockRepository.GetStocksName(query.StockCodes);
        }
    }
}