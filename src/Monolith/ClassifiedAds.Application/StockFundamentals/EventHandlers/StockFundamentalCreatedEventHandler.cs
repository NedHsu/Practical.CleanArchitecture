﻿using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.StockFundamentals.EventHandlers
{
    public class StockFundamentalCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<StockFundamental>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockFundamentalCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public void Handle(EntityCreatedEvent<StockFundamental> domainEvent)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
                var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

                auditSerivce.AddOrUpdate(new AuditLogEntry
                {
                    UserId = currentUser.IsAuthenticated ? currentUser.UserId: Guid.Empty,
                    CreatedDateTime = domainEvent.EventDateTime,
                    Action = "CREATED_StockFundamental",
                    ObjectId = domainEvent.Entity.StockCode.ToString(),
                    Log = domainEvent.Entity.AsJsonString(),
                });
            }
        }
    }
}