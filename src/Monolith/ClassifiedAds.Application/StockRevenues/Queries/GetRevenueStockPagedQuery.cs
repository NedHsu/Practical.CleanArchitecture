using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Queries;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockRevenues.Queries
{
    public class GetRevenueStockPagedQuery : StockRevenueQuery, IQuery<PagedResult<StockRevenueDTO>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetRevenueStockPagedHandler : IQueryHandler<GetRevenueStockPagedQuery, PagedResult<StockRevenueDTO>>
    {
        private readonly IStockRevenueRepository _stockrevenueRepository;

        public GetRevenueStockPagedHandler(IStockRevenueRepository stockrevenueRepository)
        {
            _stockrevenueRepository = stockrevenueRepository;
        }

        public async Task<PagedResult<StockRevenueDTO>> HandleAsync(GetRevenueStockPagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockrevenueRepository.GetpRevenuePaged(query);
        }
    }
}
