using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockGroupItems.EventHandlers
{
    public class StockGroupItemUpdatedEventHandler : IDomainEventHandler<EntityUpdatedEvent<StockGroupItem>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockGroupItemUpdatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityUpdatedEvent<StockGroupItem> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "UPDATED_StockGroupItem",
                    ObjectId = domainEvent.Entity.Id.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
