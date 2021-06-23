using System;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Models.Notifications
{
    public class NotificationModel
    {
        public Guid Id { get; set; }

        public string GroupName { get; set; }

        public List<string> UserIds { get; set; }

        public string Content { get; set; }
    }
}
