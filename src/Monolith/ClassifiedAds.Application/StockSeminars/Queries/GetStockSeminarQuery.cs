using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockSeminars.Queries
{
    public class GetStockSeminarQuery : IQuery<StockSeminar>
    {
        public string StockCode { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockSeminarQueryHandler : IQueryHandler<GetStockSeminarQuery, StockSeminar>
    {
        private readonly IBaseDapperRepository<StockSeminar> _stockseminarRepository;

        public GetStockSeminarQueryHandler(IBaseDapperRepository<StockSeminar> stockseminarRepository)
        {
            _stockseminarRepository = stockseminarRepository;
        }

        public async Task<StockSeminar> HandleAsync(GetStockSeminarQuery query, CancellationToken cancellationToken = default)
        {
            var stockseminar = await _stockseminarRepository.GetAsync(x => x.StockCode == query.StockCode);

            if (query.ThrowNotFoundIfNull && stockseminar == null)
            {
                throw new NotFoundException($"StockSeminar {query.StockCode} not found.");
            }

            return stockseminar;
        }
    }
}
