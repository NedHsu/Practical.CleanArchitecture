using ClassifiedAds.Domain.Entities;
using System.Threading;

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

        public async Task HandleAsync(AddUpdateNotificationCommand command, CancellationToken cancellationToken = default)
        {
            await _notificationService.AddOrUpdateAsync(command.Notification);
        }
    }
}
