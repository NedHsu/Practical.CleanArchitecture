using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Jobs.EventHandlers
{
    public class JobDeletedEventHandler : IDomainEventHandler<EntityDeletedEvent<Job>>
    {
        private readonly IServiceProvider _serviceProvider;

        public JobDeletedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityDeletedEvent<Job> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "DELETED_Job",
                    ObjectId = domainEvent.Entity.Id.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}
