﻿using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockEPSs.EventHandlers
{
    public class StockEPSDeletedEventHandler : IDomainEventHandler<EntityDeletedEvent<StockEPS>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockEPSDeletedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityDeletedEvent<StockEPS> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.UserId,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "DELETED_StockEPS",
                    ObjectId = $"{domainEvent.Entity.StockCode}{domainEvent.Entity.Year}",
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}