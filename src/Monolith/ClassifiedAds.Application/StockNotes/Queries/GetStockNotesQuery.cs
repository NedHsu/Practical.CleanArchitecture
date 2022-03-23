using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

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

        public List<StockNote> Handle(GetStockNotesQuery query)
        {
            if (!string.IsNullOrWhiteSpace(query.Code))
            {
                return _stocknoteRepository.GetAll(x => x.StockCode == query.Code).ToList();
            }

            return _stocknoteRepository.GetAll().ToList();
        }
    }
}
