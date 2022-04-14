using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.CalendarEvents.Queries
{
    public class GetCalendarEventQuery : IQuery<CalendarEvent>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetCalendarEventQueryHandler : IQueryHandler<GetCalendarEventQuery, CalendarEvent>
    {
        private readonly IRepository<CalendarEvent, Guid> _calendareventRepository;

        public GetCalendarEventQueryHandler(IRepository<CalendarEvent, Guid> calendareventRepository)
        {
            _calendareventRepository = calendareventRepository;
        }

        public async Task<CalendarEvent> HandleAsync(GetCalendarEventQuery query, CancellationToken cancellationToken = default)
        {
            var calendarevent = await _calendareventRepository.FirstOrDefaultAsync(_calendareventRepository.GetAll().Where(x => x.Id == query.Id));

            if (query.ThrowNotFoundIfNull && calendarevent == null)
            {
                throw new NotFoundException($"CalendarEvent {query.Id} not found.");
            }

            return calendarevent;
        }
    }
}
