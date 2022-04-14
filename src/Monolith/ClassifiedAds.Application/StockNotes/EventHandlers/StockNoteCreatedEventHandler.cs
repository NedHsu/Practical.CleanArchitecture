using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockNotes.EventHandlers
{
    public class StockNoteCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<StockNote>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockNoteCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityCreatedEvent<StockNote> domainEvent, CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId : Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_StockNote",
                    ObjectId = domainEvent.Entity.Id.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
