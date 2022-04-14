using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockEPSs.EventHandlers
{
    public class StockEPSUpdatedEventHandler : IDomainEventHandler<EntityUpdatedEvent<StockEPS>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockEPSUpdatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityUpdatedEvent<StockEPS> domainEvent, CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "UPDATED_StockEPS",
                    ObjectId = $"{domainEvent.Entity.StockCode}{domainEvent.Entity.Year}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
