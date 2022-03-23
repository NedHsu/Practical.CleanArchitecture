using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockDays.Services
{
    public class StockDayService : DapperCrudService<StockDay>, IStockDayService
    {
        public StockDayService(IBaseDapperRepository<StockDay> stockdayRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockdayRepository, domainEvents)
        {
        }
    }
}
