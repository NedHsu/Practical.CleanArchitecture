using ClassifiedAds.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace ClassifiedAds.Application.CalendarCategories.Commands
{
    public class AddUpdateCalendarCategoryCommand : ICommand
    {
        public CalendarCategory CalendarCategory { get; set; }
    }

    internal class AddUpdateCalendarCategoryCommandHandler : ICommandHandler<AddUpdateCalendarCategoryCommand>
    {
        private readonly IDapperCrudService<CalendarCategory> _calendarCategoryService;

        public AddUpdateCalendarCategoryCommandHandler(IDapperCrudService<CalendarCategory> calendarCategoryService)
        {
            _calendarCategoryService = calendarCategoryService;
        }

        public async Task HandleAsync(AddUpdateCalendarCategoryCommand command, CancellationToken cancellationToken = default)
        {
            await _calendarCategoryService.AddOrUpdateAsync(command.CalendarCategory);
        }
    }
}
