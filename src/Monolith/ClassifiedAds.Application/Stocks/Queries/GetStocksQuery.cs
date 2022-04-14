using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq.Expressions;

namespace ClassifiedAds.Application.Stocks.Queries
{
    public class GetStocksQuery : IQuery<PagedResult<Stock>>
    {
        public string Keyword { get; set; }
        public string Industry { get; set; }
        public uint PageSize { get; set; }
        public uint PageIndex { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStocksQueryHandler : IQueryHandler<GetStocksQuery, PagedResult<Stock>>
    {
        private readonly IBaseDapperRepository<Stock> _stockRepository;

        public GetStocksQueryHandler(IBaseDapperRepository<Stock> stockRepository)
        {
            _stockRepository = stockRepository;
        }

        public async Task<PagedResult<Stock>> HandleAsync(GetStocksQuery query, CancellationToken cancellationToken = default)
        {
            Expression<Func<Stock, bool>> predicate = null;
            if (!string.IsNullOrWhiteSpace(query.Industry))
            {
                predicate = x => x.Industry == query.Industry;
            }
            else if (!string.IsNullOrWhiteSpace(query.Keyword))
            {
                var keyword = query.Keyword.ToUpper();
                predicate = x => x.Code.Contains(query.Keyword) || x.Name.Contains(keyword);
            }

            return await _stockRepository.GetPaged(query.PageIndex, query.PageSize, predicate, $"{nameof(Stock.CFICode)} ASC, {nameof(Stock.Code)} ASC ");
        }
    }
}