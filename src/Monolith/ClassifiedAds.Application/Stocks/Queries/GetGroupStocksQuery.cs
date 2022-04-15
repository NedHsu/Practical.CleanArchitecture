﻿using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetGroupStocksQuery : IQuery<List<Stock>>
    {
        public Guid GroupId { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetGroupStocksQueryHandler : IQueryHandler<GetGroupStocksQuery, List<Stock>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetGroupStocksQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<List<Stock>> HandleAsync(GetGroupStocksQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockRepository.GetByGroupId(query.GroupId);
        }
    }
}