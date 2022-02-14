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
    public class GetStockEPSsQuery : IQuery<List<StockEPSDTO>>
    {
        public int Year { get; set; }
        public float GrowthRatio { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockEPSsQueryHandler : IQueryHandler<GetStockEPSsQuery, List<StockEPSDTO>>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockEPSsQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public List<StockEPSDTO> Handle(GetStockEPSsQuery query)
        {
            return _stockRepository.GetEPS(query.Year, query.GrowthRatio);
        }
    }
}