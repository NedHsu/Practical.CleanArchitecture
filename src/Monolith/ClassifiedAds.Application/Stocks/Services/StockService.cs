using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Stocks.Services
{
    public class StockService : IStockService
    {
        public StockService(IBaseDapperRepository<stock> stockRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
        {
        }
        
    }
}
