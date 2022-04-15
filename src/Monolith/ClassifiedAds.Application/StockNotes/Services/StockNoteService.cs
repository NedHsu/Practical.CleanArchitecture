﻿using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockNotes.Services
{
    public class StockNoteService : DapperCrudService<StockNote>, IStockNoteService
    {
        public StockNoteService(IBaseDapperRepository<StockNote> stocknoteRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stocknoteRepository, domainEvents)
        {
        }
    }
}
