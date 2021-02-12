using ClassifiedAds.Domain.Entities;

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

        public void Handle(DeleteCalendarEventCommand command)
        {
            _calendareventService.Delete(command.CalendarEvent);
        }
    }
}
