using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.Calendars.Commands
{
    public class AddUpdateCalendarCommand : ICommand
    {
        public Calendar Calendar { get; set; }
    }

    internal class AddUpdateCalendarCommandHandler : ICommandHandler<AddUpdateCalendarCommand>
    {
        private readonly ICrudService<Calendar> _calendarService;

        public AddUpdateCalendarCommandHandler(ICrudService<Calendar> calendarService)
        {
            _calendarService = calendarService;
        }

        public async Task HandleAsync(AddUpdateCalendarCommand command, CancellationToken cancellationToken = default)
        {
            await _calendarService.AddOrUpdateAsync(command.Calendar);
        }
    }
}
