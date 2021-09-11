using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.CalendarCategories.Commands
{
    public class DeleteCalendarCategoryCommand : ICommand
    {
        public CalendarCategory CalendarCategory { get; set; }
    }

    internal class DeleteCalendarCategoryCommandHandler : ICommandHandler<DeleteCalendarCategoryCommand>
    {
        private readonly IDapperCrudService<CalendarCategory> _calendarCategoryService;

        public DeleteCalendarCategoryCommandHandler(IDapperCrudService<CalendarCategory> calendarCategoryService)
        {
            _calendarCategoryService = calendarCategoryService;
        }

        public void Handle(DeleteCalendarCategoryCommand command)
        {
            _calendarCategoryService.Delete(command.CalendarCategory);
        }
    }
}
