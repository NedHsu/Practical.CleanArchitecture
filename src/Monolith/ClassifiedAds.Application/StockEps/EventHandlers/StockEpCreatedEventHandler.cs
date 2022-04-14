using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockEPSs.EventHandlers
{
    public class StockEPSCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<StockEPS>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockEPSCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityCreatedEvent<StockEPS> domainEvent, CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId : Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_StockEPS",
                    ObjectId = $"{domainEvent.Entity.StockCode}{domainEvent.Entity.Year}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
