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

        public async Task HandleAsync(DeleteNotificationCommand command, CancellationToken cancellationToken = default)
        {
            await _notificationService.DeleteAsync(command.Notification);
        }
    }
}
