using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.CalendarCategories.Queries
{
    public class GetCalendarCategoryQuery : IQuery<CalendarCategory>
    {
        public int Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetCalendarCategoryQueryHandler : IQueryHandler<GetCalendarCategoryQuery, CalendarCategory>
    {
        private readonly IBaseDapperRepository<CalendarCategory> _calendarCategoryRepository;

        public GetCalendarCategoryQueryHandler(IBaseDapperRepository<CalendarCategory> calendarCategoryRepository)
        {
            _calendarCategoryRepository = calendarCategoryRepository;
        }

        public CalendarCategory Handle(GetCalendarCategoryQuery query)
        {
            var calendarCategory = _calendarCategoryRepository.Get(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && calendarCategory == null)
            {
                throw new NotFoundException($"CalendarCategory {query.Id} not found.");
            }

            return calendarCategory;
        }
    }
}
