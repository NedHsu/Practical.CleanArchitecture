using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockNotes.Queries
{
    public class GetStockNotePagedQuery : IQuery<PagedResult<StockNote>>
    {
        public uint PageSize { get; set; }
        public uint PageIndex { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockNotePagedQueryHandler : IQueryHandler<GetStockNotePagedQuery, PagedResult<StockNote>>
    {
        private readonly IBaseDapperRepository<StockNote> _stocknoteRepository;

        public GetStockNotePagedQueryHandler(IBaseDapperRepository<StockNote> stocknoteRepository)
        {
            _stocknoteRepository = stocknoteRepository;
        }

        public async Task<PagedResult<StockNote>> HandleAsync(GetStockNotePagedQuery query, CancellationToken cancellationToken = default)
        {
            return await _stocknoteRepository.GetPaged(query.PageIndex, query.PageSize, null, $"ISNULL({nameof(StockNote.Updated)}, {nameof(StockNote.Created)}) desc ");
        }
    }
}
