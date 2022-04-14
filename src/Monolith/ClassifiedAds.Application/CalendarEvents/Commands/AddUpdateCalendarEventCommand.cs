using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.CalendarEvents.Commands
{
    public class AddUpdateCalendarEventCommand : ICommand
    {
        public CalendarEvent CalendarEvent { get; set; }
    }

    internal class AddUpdateCalendarEventCommandHandler : ICommandHandler<AddUpdateCalendarEventCommand>
    {
        private readonly ICrudService<CalendarEvent> _calendareventService;

        public AddUpdateCalendarEventCommandHandler(ICrudService<CalendarEvent> calendareventService)
        {
            _calendareventService = calendareventService;
        }

        public async Task HandleAsync(AddUpdateCalendarEventCommand command, CancellationToken cancellationToken = default)
        {
            await _calendareventService.AddOrUpdateAsync(command.CalendarEvent);
        }
    }
}
