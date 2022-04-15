using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Notifications.Queries
{
    public class GetNotificationsQuery : IQuery<List<Notification>>
    {
        public Guid UserId { get; set; }
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetNotificationsQueryHandler : IQueryHandler<GetNotificationsQuery, List<Notification>>
    {
        private readonly IBaseDapperRepository<Notification> _notificationRepository;

        public GetNotificationsQueryHandler(IBaseDapperRepository<Notification> notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<List<Notification>> HandleAsync(GetNotificationsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _notificationRepository.GetAllAsync()).ToList();
        }
    }
}
