using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.CalendarEvents.EventHandlers
{
    public class CalendarEventCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<CalendarEvent>>
    {
        private readonly IServiceProvider _serviceProvider;

        public CalendarEventCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityCreatedEvent<CalendarEvent> domainEvent)
        {
            using var scope = _serviceProvider.CreateScope();
            var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
            var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

            auditSerivce.AddOrUpdate(new AuditLogEntry
            {
                UserId = currentUser.IsAuthenticated ? currentUser.UserId : Guid.Empty,
                CreatedDateTime = domainEvent.EventDateTime,
                Action = "CREATED_PRODUCT",
                ObjectId = domainEvent.Entity.Id.ToString(),
                Log = domainEvent.Entity.AsJsonString(),
            });
        }
    }
}
