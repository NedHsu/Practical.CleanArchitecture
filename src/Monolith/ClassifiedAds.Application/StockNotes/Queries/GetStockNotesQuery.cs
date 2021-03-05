using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.StockNotes.Queries
{
    public class GetStockNotesQuery : IQuery<List<StockNote>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetStockNotesQueryHandler : IQueryHandler<GetStockNotesQuery, List<StockNote>>
    {
        private readonly IStockRepository<StockNote> _stocknoteRepository;

        public GetStockNotesQueryHandler(IStockRepository<StockNote> stocknoteRepository)
        {
            _stocknoteRepository = stocknoteRepository;
        }

        public List<StockNote> Handle(GetStockNotesQuery query)
        {
            return _stocknoteRepository.GetAll().ToList();
        }
    }
}
