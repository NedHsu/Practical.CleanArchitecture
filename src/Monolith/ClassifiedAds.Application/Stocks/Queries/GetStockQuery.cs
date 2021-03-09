using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockQuery : IQuery<stock>
    {
        public string Code { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockQueryHandler : IQueryHandler<GetStockQuery, stock>
    {
        private readonly IBaseDapperRepository<stock> _stockRepository;

        public GetStockQueryHandler(IBaseDapperRepository<stock> stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public stock Handle(GetStockQuery query)
        {
            var stock = _stockRepository.Get(x => x.code == query.Code);

            if (query.ThrowNotFoundIfNull && stock == null)
            {
                throw new NotFoundException($"Stock {query.Code} not found.");
            }

            return stock;
        }
    }
}
