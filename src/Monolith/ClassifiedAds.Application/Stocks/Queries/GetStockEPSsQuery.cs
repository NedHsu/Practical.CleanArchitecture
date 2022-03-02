using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

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