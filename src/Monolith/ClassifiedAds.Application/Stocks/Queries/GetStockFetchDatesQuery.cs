using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockFetchDatesQuery : IQuery<StockFetchDatesDTO>
    {
        public List<string> StockCodes { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFetchDatesQueryHandler : IQueryHandler<GetStockFetchDatesQuery, StockFetchDatesDTO>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockFetchDatesQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public StockFetchDatesDTO Handle(GetStockFetchDatesQuery query)
        {
            return _stockRepository.GetStockFetchDates();
        }
    }
}