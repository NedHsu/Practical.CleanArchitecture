using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Notifications.Commands
{
    public class DeleteNotificationCommand : ICommand
    {
        public Notification Notification { get; set; }
    }

    internal class DeleteNotificationCommandHandler : ICommandHandler<DeleteNotificationCommand>
    {
        private readonly IDapperCrudService<Notification> _notificationService;

        public DeleteNotificationCommandHandler(IDapperCrudService<Notification> notificationService)
        {
            _notificationService = notificationService;
        }

        public void Handle(DeleteNotificationCommand command)
        {
            _notificationService.Delete(command.Notification);
        }
    }
}
