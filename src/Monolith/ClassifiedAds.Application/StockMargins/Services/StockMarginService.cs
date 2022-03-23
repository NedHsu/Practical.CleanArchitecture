using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockMargins.Services
{
    public class StockMarginService : DapperCrudService<StockMargin>, IStockMarginService
    {
        public StockMarginService(IBaseDapperRepository<StockMargin> stockmarginRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockmarginRepository, domainEvents)
        {
        }
    }
}
