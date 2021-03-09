using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.StockNotes.Queries
{
    public class GetStockNoteQuery : IQuery<StockNote>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetStockNoteQueryHandler : IQueryHandler<GetStockNoteQuery, StockNote>
    {
        private readonly IBaseDapperRepository<StockNote> _stocknoteRepository;

        public GetStockNoteQueryHandler(IBaseDapperRepository<StockNote> stocknoteRepository)
        {
            _stocknoteRepository = stocknoteRepository;
        }

        public StockNote Handle(GetStockNoteQuery query)
        {
            var stocknote = _stocknoteRepository.Get(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && stocknote == null)
            {
                throw new NotFoundException($"StockNote {query.Id} not found.");
            }

            return stocknote;
        }
    }
}
