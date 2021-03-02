using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.Domain.Events
{
    public class EntityUpdatedEvent<T> : IDomainEvent
        where T : class
    {
        public EntityUpdatedEvent(T entity, DateTime eventDateTime)
        {
            Entity = entity;
            EventDateTime = eventDateTime;
        }

        public T Entity { get; }

        public DateTime EventDateTime { get; }
    }
}
