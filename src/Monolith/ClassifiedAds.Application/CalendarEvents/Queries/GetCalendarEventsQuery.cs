using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.CalendarEvents.Queries
{
    public class GetCalendarEventsQuery : IQuery<List<CalendarEvent>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetCalendarEventsQueryHandler : IQueryHandler<GetCalendarEventsQuery, List<CalendarEvent>>
    {
        private readonly IRepository<CalendarEvent, Guid> _calendareventRepository;

        public GetCalendarEventsQueryHandler(IRepository<CalendarEvent, Guid> calendareventRepository)
        {
            _calendareventRepository = calendareventRepository;
        }

        public List<CalendarEvent> Handle(GetCalendarEventsQuery query)
        {
            return _calendareventRepository.GetAll().ToList();
        }
    }
}
