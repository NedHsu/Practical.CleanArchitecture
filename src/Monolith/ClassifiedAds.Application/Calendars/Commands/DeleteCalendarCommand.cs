using ClassifiedAds.Domain.Entities;

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

        public void Handle(DeleteCalendarCommand command)
        {
            _calendarService.Delete(command.Calendar);
        }
    }
}
