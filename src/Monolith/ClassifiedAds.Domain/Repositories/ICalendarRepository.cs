using ClassifiedAds.Domain.Entities;
using System;
using System.Linq;

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
