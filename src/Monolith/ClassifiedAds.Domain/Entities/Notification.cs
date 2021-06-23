using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities
{
    public class Notification : AggregateRoot<Guid>
    {
        public string Content { get; set; }

        public string Action { get; set; }

        public bool IsAll { get; set; }

        public IList<NotificationUser> Users { get; set; }

        public User Creater { get; set; }
    }
}