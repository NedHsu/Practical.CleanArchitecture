using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockRevenues.Services
{
    public class StockRevenueService : DapperCrudService<StockRevenue>, IStockRevenueService
    {
        public StockRevenueService(IBaseDapperRepository<StockRevenue> stockrevenueRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockrevenueRepository, domainEvents)
        {
        }
    }
}
