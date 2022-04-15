using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Notifications.Queries
{
    public class GetNotificationQuery : IQuery<Notification>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetNotificationQueryHandler : IQueryHandler<GetNotificationQuery, Notification>
    {
        private readonly IBaseDapperRepository<Notification> _notificationRepository;

        public GetNotificationQueryHandler(IBaseDapperRepository<Notification> notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<Notification> HandleAsync(GetNotificationQuery query, CancellationToken cancellationToken = default)
        {
            var notification = await _notificationRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && notification == null)
            {
                throw new NotFoundException($"Notification {query.Id} not found.");
            }

            return notification;
        }
    }
}
