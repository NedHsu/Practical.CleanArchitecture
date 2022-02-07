using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockQuery : IQuery<Stock>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockQueryHandler : IQueryHandler<GetStockQuery, Stock>
    {
        private readonly IStockDapperRepository _stockRepository;

        public GetStockQueryHandler(IStockDapperRepository stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public Stock Handle(GetStockQuery query)
        {
            var stock = _stockRepository.Get(x => x.Code == query.Code);

            if (query.ThrowNotFoundIfNull && stock == null)
            {
                throw new NotFoundException($"Stock {query.Code} not found.");
            }

            return stock;
        }
    }
}
