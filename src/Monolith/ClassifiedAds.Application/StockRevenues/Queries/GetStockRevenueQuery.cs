using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetStockRevenueQuery : IQuery<StockRevenue>
    {
        public string Code { get; set; }
        public DateTime Date { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockRevenueQueryHandler : IQueryHandler<GetStockRevenueQuery, StockRevenue>
    {
        private readonly IBaseDapperRepository<StockRevenue> _stockrevenueRepository;

        public GetStockRevenueQueryHandler(IBaseDapperRepository<StockRevenue> stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public async Task<StockRevenue> HandleAsync(GetStockRevenueQuery query, CancellationToken cancellationToken = default)
        {
            var stockrevenue = await _stockrevenueRepository.GetAsync(x => x.StockCode == query.Code && x.Date == query.Date);

            if (query.ThrowNotFoundIfNull && stockrevenue == null)
            {
                throw new NotFoundException($"StockRevenue {query.Code} not found.");
            }

            return stockrevenue;
        }
    }
}
