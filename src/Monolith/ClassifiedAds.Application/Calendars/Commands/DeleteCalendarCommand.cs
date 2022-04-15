namespace ClassifiedAds.Application.Calendars.Commands
{
    public class DeleteCalendarCommand : ICommand
    {
        public Calendar Calendar { get; set; }
    }

    internal class DeleteCalendarCommandHandler : ICommandHandler<DeleteCalendarCommand>
    {
        private readonly IDapperCrudService<Calendar> _calendarService;

        public DeleteCalendarCommandHandler(IDapperCrudService<Calendar> calendarService)
        {
            _calendarService = calendarService;
        }

        public async Task HandleAsync(DeleteCalendarCommand command, CancellationToken cancellationToken = default)
        {
            await _calendarService.DeleteAsync(command.Calendar);
        }
    }
}
