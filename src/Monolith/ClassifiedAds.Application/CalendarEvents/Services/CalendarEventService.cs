using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.CalendarEvents.Services
{
    public class CalendarEventService : CrudService<CalendarEvent>, ICalendarEventService
    {
        public CalendarEventService(IRepository<CalendarEvent, Guid> calendareventRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(calendareventRepository, domainEvents)
        {
        }
    }
}
