using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.StockNotes.Services
{
    public class StockNoteService : StockCrudService<StockNote>, IStockNoteService
    {
        public StockNoteService(IStockRepository<StockNote> stocknoteRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stocknoteRepository, domainEvents)
        {
        }
    }
}
