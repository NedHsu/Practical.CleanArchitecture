using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Jobs.EventHandlers
{
    public class JobCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<Job>>
    {
        private readonly IServiceProvider _serviceProvider;

        public JobCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        public async Task HandleAsync(EntityCreatedEvent<Job> domainEvent, CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId : Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_Job",
                    ObjectId = domainEvent.Entity.Id.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
