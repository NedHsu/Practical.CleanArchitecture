using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockFundamentals.EventHandlers
{
    public class StockFundamentalDeletedEventHandler : IDomainEventHandler<EntityDeletedEvent<StockFundamental>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockFundamentalDeletedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityDeletedEvent<StockFundamental> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "DELETED_StockFundamental",
                    ObjectId = domainEvent.Entity.StockCode,
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
