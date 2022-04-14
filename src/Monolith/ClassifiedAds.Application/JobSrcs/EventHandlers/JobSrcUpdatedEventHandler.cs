using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.JobSrcs.EventHandlers
{
    public class JobSrcUpdatedEventHandler : IDomainEventHandler<EntityUpdatedEvent<JobSrc>>
    {
        private readonly IServiceProvider _serviceProvider;

        public JobSrcUpdatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityUpdatedEvent<JobSrc> domainEvent, CancellationToken cancellationToken = default)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "UPDATED_JobSrc",
                    ObjectId = $"{domainEvent.Entity.Id}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
