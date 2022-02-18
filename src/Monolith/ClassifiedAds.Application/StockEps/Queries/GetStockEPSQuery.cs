using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.StockEPSs.Queries
{
    public class GetStockEPSQuery : IQuery<StockEPS>
    {
        public string Code { get; set; }
        public int Year { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockEPSQueryHandler : IQueryHandler<GetStockEPSQuery, StockEPS>
    {
        private readonly IBaseDapperRepository<StockEPS> _stockEpRepository;

        public GetStockEPSQueryHandler(IBaseDapperRepository<StockEPS> stockEpRepository)
        {
            _stockEpRepository = stockEpRepository;
        }

        public StockEPS Handle(GetStockEPSQuery query)
        {
            var stockEp = _stockEpRepository.Get(x => x.StockCode == query.Code && x.Year == query.Year);

            if (query.ThrowNotFoundIfNull && stockEp == null)
            {
                throw new NotFoundException($"StockEPS {query.Code} not found.");
            }

            return stockEp;
        }
    }
}
