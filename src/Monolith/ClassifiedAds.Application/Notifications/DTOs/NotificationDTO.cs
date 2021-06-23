using System;

namespace ClassifiedAds.Application.Notifications.DTOs
{
    public class NotificationDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
