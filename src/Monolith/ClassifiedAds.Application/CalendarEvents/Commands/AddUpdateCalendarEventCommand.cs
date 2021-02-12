using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateCalendarEventCommand command)
        {
            _calendareventService.AddOrUpdate(command.CalendarEvent);
        }
    }
}
