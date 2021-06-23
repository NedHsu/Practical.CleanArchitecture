using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

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

        public Notification Handle(GetNotificationQuery query)
        {
            var notification = _notificationRepository.Get(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && notification == null)
            {
                throw new NotFoundException($"Notification {query.Id} not found.");
            }

            return notification;
        }
    }
}
