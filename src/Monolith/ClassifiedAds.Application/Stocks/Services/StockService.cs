﻿using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Stocks.Services
{
    public class StockService : IStockService
    {
        public StockService(IBaseDapperRepository<Stock> stockRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
        {
        }

    }
}
