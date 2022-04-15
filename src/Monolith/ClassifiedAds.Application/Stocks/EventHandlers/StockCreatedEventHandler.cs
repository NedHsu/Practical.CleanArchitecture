﻿using ClassifiedAds.CrossCuttingConcerns.ExtensionMethods;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace ClassifiedAds.Application.Stocks.EventHandlers
{
    public class StockCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<Stock>>
    {
        private readonly IServiceProvider _serviceProvider;

        public StockCreatedEventHandler(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task HandleAsync(EntityCreatedEvent<Stock> domainEvent, CancellationToken cancellationToken = default)
        {
            using var scope = _serviceProvider.CreateScope();
            var auditSerivce = scope.ServiceProvider.GetService<ICrudService<AuditLogEntry>>();
            var currentUser = scope.ServiceProvider.GetService<ICurrentUser>();

            await auditSerivce.AddOrUpdateAsync(new AuditLogEntry
            {
                UserId = currentUser.IsAuthenticated ? currentUser.UserId : Guid.Empty,
                CreatedDateTime = domainEvent.EventDateTime,
                Action = "CREATED_STOCK",
                ObjectId = domainEvent.Entity.Code.ToString(),
                Log = domainEvent.Entity.AsJsonString(),
            });
        }
    }
}
