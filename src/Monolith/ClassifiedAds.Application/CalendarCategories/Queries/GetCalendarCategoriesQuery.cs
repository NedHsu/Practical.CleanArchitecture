using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

namespace ClassifiedAds.Application.CalendarCategories.Queries
{
    public class GetCalendarCategoriesQuery : IQuery<List<CalendarCategory>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetCalendarCategoriesQueryHandler : IQueryHandler<GetCalendarCategoriesQuery, List<CalendarCategory>>
    {
        private readonly IRepository<CalendarCategory, int> _calendarCategoryRepository;

        public GetCalendarCategoriesQueryHandler(IRepository<CalendarCategory, int> calendarCategoryRepository)
        {
            _calendarCategoryRepository = calendarCategoryRepository;
        }

        public async Task<List<CalendarCategory>> HandleAsync(GetCalendarCategoriesQuery query, CancellationToken cancellationToken = default)
        {
            return (await _calendarCategoryRepository.GetAllAsync()).ToList();
        }
    }
}
