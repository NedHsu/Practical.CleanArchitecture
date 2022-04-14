using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Stocks.EventHandlers
{
    public class StockDeletedEventHandler : IDomainEventHandler<EntityDeletedEvent<Stock>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockDeletedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityDeletedEvent<Stock> domainEvent, CancellationToken cancellationToken = default)
        {
            using var scope = _serviceProvider.CreateScope();
            var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
            var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

            await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
            {
                UserId = currentUser.UserId,
                CreatedDateTime = domainEvent.EventDateTime,
                Action = "DELETED_STOCK",
                ObjectId = domainEvent.Entity.Code,
                Log = domainEvent.Entity.AsJsonString(),
            });
        }
    }
}
