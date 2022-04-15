using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.StockNotes.Queries
{
    public class GetStockNotesQuery : IQuery<List<StockNote>>
    {
        public string Code { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockNotesQueryHandler : IQueryHandler<GetStockNotesQuery, List<StockNote>>
    {
        private readonly IBaseDapperRepository<StockNote> _stocknoteRepository;

        public GetStockNotesQueryHandler(IBaseDapperRepository<StockNote> stocknoteRepository)
        {
            _stocknoteRepository = stocknoteRepository;
        }

        public async Task<List<StockNote>> HandleAsync(GetStockNotesQuery query, CancellationToken cancellationToken = default)
        {
            if (!string.IsNullOrWhiteSpace(query.Code))
            {
                return _stocknoteRepository.GetAllAsync(x => x.StockCode == query.Code).Result.ToList();
            }

            return (await _stocknoteRepository.GetAllAsync()).ToList();
        }
    }
}
