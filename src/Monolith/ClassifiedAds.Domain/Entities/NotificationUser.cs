using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities
{
    public class NotificationUser : AggregateRoot<Guid>
    {
        public Notification Notification { get; set; }

        public IList<User> Users { get; set; }

        public bool IsRead { get; set; }
    }
}