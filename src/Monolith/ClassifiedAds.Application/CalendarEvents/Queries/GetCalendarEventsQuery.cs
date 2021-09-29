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

        public List<CalendarEvent> Handle(GetCalendarEventsQuery query)
        {
            var result = _calendareventRepository.GetAll();
            if (query.Start.HasValue)
            {
                result = result.Where(x => x.EndTime.Date >= query.Start);
            }

            if (query.End.HasValue)
            {
                result = result.Where(x => x.StartTime.Date <= query.End);
            }

            return result.ToList();
        }
    }
}
