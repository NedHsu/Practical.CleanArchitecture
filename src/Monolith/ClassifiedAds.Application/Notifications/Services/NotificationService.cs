using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Notifications.Services
{
    public class NotificationService : DapperCrudService<Notification>, INotificationService
    {
        public NotificationService(IBaseDapperRepository<Notification> notificationRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(notificationRepository, domainEvents)
        {
        }
    }
}
