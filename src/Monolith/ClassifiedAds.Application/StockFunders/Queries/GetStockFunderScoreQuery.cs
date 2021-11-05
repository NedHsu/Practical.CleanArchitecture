using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetStockFunderScoreQuery : IQuery<List<StockFunderScoreDTO>>
    {
        public DateTime StartDate { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockFunderScoreQueryHandler : IQueryHandler<GetStockFunderScoreQuery, List<StockFunderScoreDTO>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetStockFunderScoreQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public List<StockFunderScoreDTO> Handle(GetStockFunderScoreQuery query)
        {
            return _stockFunderRepository.GetStockFunderScore(query.StartDate);
        }
    }
}
