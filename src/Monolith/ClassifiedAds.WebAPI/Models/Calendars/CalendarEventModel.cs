using System;

namespace ClassifiedAds.WebAPI.Models.CalendarEvents
{
    public class CalendarEventModel
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
