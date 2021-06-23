using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public List<Notification> Handle(GetNotificationsQuery query)
        {
            return _notificationRepository.GetAll().ToList();
        }
    }
}
