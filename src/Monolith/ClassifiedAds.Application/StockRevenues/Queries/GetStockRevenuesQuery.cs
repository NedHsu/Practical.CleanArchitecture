using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetStockRevenuesQuery : IQuery<List<StockRevenueDTO>>
    {
        public string StockCode { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockRevenuesQueryHandler : IQueryHandler<GetStockRevenuesQuery, List<StockRevenueDTO>>
    {
        private readonly IStockRevenueRepository _stockrevenueRepository;

        public GetStockRevenuesQueryHandler(IStockRevenueRepository stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public List<StockRevenueDTO> Handle(GetStockRevenuesQuery query)
        {
            return _stockrevenueRepository.GetTopRevenues();
        }
    }
}
