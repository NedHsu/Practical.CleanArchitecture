using System;

namespace ClassifiedAds.Domain.Events
{
    public class EntityCreatedEvent<T> : IDomainEvent
        where T : class
    {
        public EntityCreatedEvent(T entity, DateTime eventDateTime)
        {
            Entity = entity;
            EventDateTime = eventDateTime;
        }

        public T Entity { get; }

        public DateTime EventDateTime { get; }
    }
}
