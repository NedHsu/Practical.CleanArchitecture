using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ClassifiedAds.Application.StockNews.Queries
{
    public class GetStockNewsQuery : IQuery<IEnumerable<StockNew>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockNewsQueryHandler : IQueryHandler<GetStockNewsQuery, IEnumerable<StockNew>>
    {
        private readonly IBaseDapperRepository<StockNew> _stockNewRepository;

        public GetStockNewsQueryHandler(IBaseDapperRepository<StockNew> stockNewRepository)
        {
            _stockNewRepository = stockNewRepository;
        }

        public async Task<IEnumerable<StockNew>> HandleAsync(GetStockNewsQuery query, CancellationToken cancellationToken = default)
        {
            return await _stockNewRepository.GetAllAsync();
        }
    }
}
