using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStockQuery : IQuery<Stock>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockQueryHandler : IQueryHandler<GetStockQuery, Stock>
    {
        private readonly IRepository<Stock, Guid> _stockRepository;

        public GetStockQueryHandler(IRepository<Stock, Guid> stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public Stock Handle(GetStockQuery query)
        {
            var stock = _stockRepository.GetAll().FirstOrDefault(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && stock == null)
            {
                throw new NotFoundException($"Stock {query.Id} not found.");
            }

            return stock;
        }
    }
}
