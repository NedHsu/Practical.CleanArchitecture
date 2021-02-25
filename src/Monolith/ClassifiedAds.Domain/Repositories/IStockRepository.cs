using ClassifiedAds.Domain.Entities;
using System;
using System.Linq;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockRepository<T>
    {
        IQueryable<T> Get();
    }
}
