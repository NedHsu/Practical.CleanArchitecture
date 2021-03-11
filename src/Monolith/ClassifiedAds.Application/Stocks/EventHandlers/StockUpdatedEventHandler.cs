using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Stocks.EventHandlers
{
    public class StockUpdatedEventHandler : IDomainEventHandler<EntityUpdatedEvent<Stock>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockUpdatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityUpdatedEvent<Stock> domainEvent)
        {
            using var scope = _serviceProvider.CreateScope();
            var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
            var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

            auditSerivce.AddOrUpdate(new AuditLogEntry
            {
                UserId = currentUser.UserId,
                CreatedDateTime = domainEvent.EventDateTime,
                Action = "UPDATED_STOCK",
                ObjectId = domainEvent.Entity.Code,
                Log = domainEvent.Entity.AsJsonString(),
            });
        }
    }
}
