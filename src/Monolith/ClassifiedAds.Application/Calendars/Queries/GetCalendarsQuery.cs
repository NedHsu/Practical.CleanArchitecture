using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Calendars.Queries
{
    public class GetCalendarsQuery : IQuery<List<Calendar>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetCalendarsQueryHandler : IQueryHandler<GetCalendarsQuery, List<Calendar>>
    {
        private readonly ICalendarRepository _calendarRepository;

        public GetCalendarsQueryHandler(ICalendarRepository calendarRepository)
        {
            _calendarRepository = calendarRepository;
        }

        public List<Calendar> Handle(GetCalendarsQuery query)
        {
            return _calendarRepository.Get(new CalendarQueryOptions { IncludeCategory = true }).ToList();
        }
    }
}
