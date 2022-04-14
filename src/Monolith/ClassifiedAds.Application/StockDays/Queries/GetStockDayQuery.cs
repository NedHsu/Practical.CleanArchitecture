using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockDays.Queries
{
    public class GetStockDayQuery : IQuery<StockDay>
    {
        public string StockCode { get; set; }
        public DateTime Date { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockDayQueryHandler : IQueryHandler<GetStockDayQuery, StockDay>
    {
        private readonly IBaseDapperRepository<StockDay> _stockdayRepository;

        public GetStockDayQueryHandler(IBaseDapperRepository<StockDay> stockdayRepository)
        {
            _stockdayRepository = stockdayRepository;
        }

        public async Task<StockDay> HandleAsync(GetStockDayQuery query, CancellationToken cancellationToken = default)
        {
            var stockday = await _stockdayRepository.GetAsync(x => x.StockCode == query.StockCode && x.Date == query.Date);

            if (query.ThrowNotFoundIfNull && stockday == null)
            {
                throw new NotFoundException($"StockDay {query.StockCode} not found.");
            }

            return stockday;
        }
    }
}
