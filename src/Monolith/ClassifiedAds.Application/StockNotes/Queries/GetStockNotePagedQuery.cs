using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public PagedResult<StockNote> Handle(GetStockNotePagedQuery query)
        {
            return _stocknoteRepository.GetPaged(query.PageIndex, query.PageSize, null, $"ISNULL({nameof(StockNote.Updated)}, {nameof(StockNote.Created)}) desc ");
        }
    }
}
