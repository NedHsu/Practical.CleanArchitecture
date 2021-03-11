using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.StockFundamentals.Queries
{
    public class GetStockFundamentalQuery : IQuery<StockFundamental>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockFundamentalQueryHandler : IQueryHandler<GetStockFundamentalQuery, StockFundamental>
    {
        private readonly IBaseDapperRepository<StockFundamental> _stockfundamentalRepository;

        public GetStockFundamentalQueryHandler(IBaseDapperRepository<StockFundamental> stockfundamentalRepository)
        {
            _stockfundamentalRepository = stockfundamentalRepository;
        }

        public StockFundamental Handle(GetStockFundamentalQuery query)
        {
            var stockfundamental = _stockfundamentalRepository.Get(x => x.StockCode == query.Code);

            if (query.ThrowNotFoundIfNull && stockfundamental == null)
            {
                throw new NotFoundException($"StockFundamental {query.Code} not found.");
            }

            return stockfundamental;
        }
    }
}
