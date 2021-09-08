using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Calendars.Queries
{
    public class GetCalendarQuery : IQuery<Calendar>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetCalendarQueryHandler : IQueryHandler<GetCalendarQuery, Calendar>
    {
        private readonly IRepository<Calendar, Guid> _calendarRepository;

        public GetCalendarQueryHandler(IRepository<Calendar, Guid> calendarRepository)
        {
            _calendarRepository = calendarRepository;
        }

        public Calendar Handle(GetCalendarQuery query)
        {
            var calendar = _calendarRepository.GetAll().FirstOrDefault(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && calendar == null)
            {
                throw new NotFoundException($"Calendar {query.Id} not found.");
            }

            return calendar;
        }
    }
}
