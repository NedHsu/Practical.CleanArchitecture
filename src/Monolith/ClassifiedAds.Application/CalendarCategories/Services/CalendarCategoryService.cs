using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Services
{
    public class CalendarCategoryService : DapperCrudService<CalendarCategory>, ICalendarCategoryService
    {
        public CalendarCategoryService(IBaseDapperRepository<CalendarCategory> calendarCategoryRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(calendarCategoryRepository, domainEvents)
        {
        }
    }
}
