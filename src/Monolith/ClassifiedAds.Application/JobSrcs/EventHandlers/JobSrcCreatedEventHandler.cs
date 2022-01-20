using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.JobSrcs.EventHandlers
{
    public class JobSrcCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<JobSrc>>
    {
        private readonly IServiceProvider _serviceProvider;

        public JobSrcCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityCreatedEvent<JobSrc> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId: Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_JobSrc",
                    ObjectId = $"{domainEvent.Entity.Provider}/{domainEvent.Entity.Name}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
