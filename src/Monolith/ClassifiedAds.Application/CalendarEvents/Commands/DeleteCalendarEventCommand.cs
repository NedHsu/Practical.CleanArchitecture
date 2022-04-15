namespace ClassifiedAds.Application.CalendarEvents.Commands
{
    public class DeleteCalendarEventCommand : ICommand
    {
        public CalendarEvent CalendarEvent { get; set; }
    }

    internal class DeleteCalendarEventCommandHandler : ICommandHandler<DeleteCalendarEventCommand>
    {
        private readonly ICrudService<CalendarEvent> _calendareventService;

        public DeleteCalendarEventCommandHandler(ICrudService<CalendarEvent> calendareventService)
        {
            _calendareventService = calendareventService;
        }

        public async Task HandleAsync(DeleteCalendarEventCommand command, CancellationToken cancellationToken = default)
        {
            await _calendareventService.DeleteAsync(command.CalendarEvent);
        }
    }
}
