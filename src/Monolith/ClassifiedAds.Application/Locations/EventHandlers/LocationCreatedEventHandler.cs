using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Locations.EventHandlers
{
    public class LocationCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<Location>>
    {
        private readonly IServiceProvider _serviceProvider;

        public LocationCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityCreatedEvent<Location> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId: Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_PRODUCT",
                    ObjectId = domainEvent.Entity.Id.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
