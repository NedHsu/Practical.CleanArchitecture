using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Stocks.Services
{
    public class StockService : CrudService<Stock>, IStockService
    {
        public StockService(IRepository<Stock, Guid> stockRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockRepository, domainEvents)
        {
        }
        
    }
}
