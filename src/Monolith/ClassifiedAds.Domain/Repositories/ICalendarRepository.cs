using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface ICalendarRepository : IRepository<Calendar, Guid>
    {
        IQueryable<Calendar> Get(CalendarQueryOptions queryOptions);
    }

    public class CalendarQueryOptions
    {
        public bool IncludeCategory { get; set; }
    }
}
