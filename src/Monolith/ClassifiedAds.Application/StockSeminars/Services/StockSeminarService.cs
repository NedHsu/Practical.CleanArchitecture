using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.StockSeminars.Services
{
    public class StockSeminarService : DapperCrudService<StockSeminar>, IStockSeminarService
    {
        public StockSeminarService(IBaseDapperRepository<StockSeminar> stockseminarRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(stockseminarRepository, domainEvents)
        {
        }
    }
}
