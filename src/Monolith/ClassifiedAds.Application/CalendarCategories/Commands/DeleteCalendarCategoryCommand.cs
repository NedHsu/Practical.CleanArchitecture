using ClassifiedAds.Domain.Entities;
using System.Threading;

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

        public async Task HandleAsync(DeleteCalendarCategoryCommand command, CancellationToken cancellationToken = default)
        {
            await _calendarCategoryService.DeleteAsync(command.CalendarCategory);
        }
    }
}
