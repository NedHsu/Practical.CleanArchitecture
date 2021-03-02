using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application
{
    public interface IDapperCrudService<T>
        where T : class
    {
        IList<T> Get();

        void AddOrUpdate(T entity);

        void Delete(T entity);
    }
}
