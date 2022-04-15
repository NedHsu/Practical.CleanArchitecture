using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockFundamentals.Services
{
    public class StockFundamentalService : DapperCrudService<StockFundamental>, IStockFundamentalService
    {
        public StockFundamentalService(IBaseDapperRepository<StockFundamental> stockfundamentalRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockfundamentalRepository, domainEvents)
        {
        }
    }
}
