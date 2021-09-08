using System;

namespace ClassifiedAds.WebAPI.Models.CalendarEvents
{
    public class CalendarEventModel
    {
        public Guid Id { get; set; }

        public DateTime Start { get; set; }

        public DateTime End { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public bool IsAllDay { get; set; }

        public bool IsVisible { get; set; }

        public string Category { get; set; }
    }
}
