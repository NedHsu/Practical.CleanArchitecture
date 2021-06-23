using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Notifications.Commands
{
    public class AddUpdateNotificationCommand : ICommand
    {
        public Notification Notification { get; set; }
    }

    internal class AddUpdateNotificationCommandHandler : ICommandHandler<AddUpdateNotificationCommand>
    {
        private readonly IDapperCrudService<Notification> _notificationService;

        public AddUpdateNotificationCommandHandler(IDapperCrudService<Notification> notificationService)
        {
            _notificationService = notificationService;
        }

        public void Handle(AddUpdateNotificationCommand command)
        {
            _notificationService.AddOrUpdate(command.Notification);
        }
    }
}
