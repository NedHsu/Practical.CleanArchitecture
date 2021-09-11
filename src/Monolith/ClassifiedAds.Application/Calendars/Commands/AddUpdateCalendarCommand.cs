using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateCalendarCommand command)
        {
            _calendarService.AddOrUpdate(command.Calendar);
        }
    }
}
