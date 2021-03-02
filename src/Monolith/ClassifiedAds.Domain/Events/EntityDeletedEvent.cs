using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.Domain.Events
{
    public class EntityDeletedEvent<T> : IDomainEvent
        where T : class
    {
        public EntityDeletedEvent(T entity, DateTime eventDateTime)
        {
            Entity = entity;
            EventDateTime = eventDateTime;
        }

        public T Entity { get; }

        public DateTime EventDateTime { get; }
    }
}
