using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class CalendarService : CrudService<Calendar>, ICalendarService
    {
        public CalendarService(IRepository<Calendar, Guid> calendarRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(calendarRepository, domainEvents)
        {
        }
    }
}
