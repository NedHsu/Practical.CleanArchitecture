using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.CalendarEvents.Queries
{
    public class GetCalendarEventsQuery : IQuery<List<CalendarEvent>>
    {
        public DateTime? Start { get; set; }

        public DateTime? End { get; set; }
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

        public async Task<List<CalendarEvent>> HandleAsync(GetCalendarEventsQuery query, CancellationToken cancellationToken = default)
        {
            List<CalendarEvent> result = null;
            if (query.Start.HasValue)
            {
                result = await _calendareventRepository.ToListAsync(_calendareventRepository.GetAll().Where(x => x.EndTime.Date >= query.Start));
            }

            if (query.End.HasValue)
            {
                result = await _calendareventRepository.ToListAsync(_calendareventRepository.GetAll().Where(x => x.StartTime.Date <= query.End));
            }

            return result;
        }
    }
}
