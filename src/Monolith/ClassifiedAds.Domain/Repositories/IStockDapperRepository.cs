using ClassifiedAds.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IStockDapperRepository : IBaseDapperRepository<stock>
    {
        List<stock> GetByGroupId(Guid groupId);
    }
}
