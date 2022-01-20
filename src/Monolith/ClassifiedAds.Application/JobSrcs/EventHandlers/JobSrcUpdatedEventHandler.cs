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

        public void Handle(EntityUpdatedEvent<JobSrc> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "UPDATED_JobSrc",
                    ObjectId = $"{domainEvent.Entity.Provider}/{domainEvent.Entity.Name}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
