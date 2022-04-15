using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockFunders.Queries
{
    public class GetCreditStockFunderPagedQuery : IQuery<PagedResult<StockFunderDTO>>
    {
        public uint PageSize { get; set; } = 30;
        public uint PageIndex { get; set; } = 1;
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetCreditStockFunderPagedQueryHandler : IQueryHandler<GetCreditStockFunderPagedQuery, PagedResult<StockFunderDTO>>
    {
        private readonly IStockFunderRepository _stockFunderRepository;

        public GetCreditStockFunderPagedQueryHandler(IStockFunderRepository stockfunderRepository)
        {
            _stockFunderRepository = stockfunderRepository;
        }

        public async Task<PagedResult<StockFunderDTO>> HandleAsync(GetCreditStockFunderPagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockFunderRepository.GetCreditBuyPaged(query.PageIndex, query.PageSize);
        }
    }
}
