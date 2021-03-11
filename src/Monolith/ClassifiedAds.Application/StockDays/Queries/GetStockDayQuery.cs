using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

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

        public StockDay Handle(GetStockDayQuery query)
        {
            var stockday = _stockdayRepository.Get(x => x.StockCode == query.StockCode && x.Date == query.Date);

            if (query.ThrowNotFoundIfNull && stockday == null)
            {
                throw new NotFoundException($"StockDay {query.StockCode} not found.");
            }

            return stockday;
        }
    }
}
