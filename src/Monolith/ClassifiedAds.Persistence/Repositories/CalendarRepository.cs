using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

namespace ClassifiedAds.Persistence.Repositories
{
    public class CalendarRepository : Repository<Calendar, Guid>, ICalendarRepository
    {
        public CalendarRepository(AdsDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public IQueryable<Calendar> Get(CalendarQueryOptions queryOptions)
        {
            var query = GetAll();

            if (queryOptions.IncludeCategory)
            {
                query = query.Include(x => x.Category);
            }

            return query;
        }
    }
}
