using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

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

        public async Task<List<Calendar>> HandleAsync(GetCalendarsQuery query, CancellationToken cancellationToken = default)
        {
            return await _calendarRepository.ToListAsync(_calendarRepository.Get(new CalendarQueryOptions { IncludeCategory = true }));
        }
    }
}
