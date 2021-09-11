using System;

namespace ClassifiedAds.WebAPI.Models.Calendars
{
    public class CalendarEventModel
    {
        public Guid Id { get; set; }

        public Guid CalendarId { get; set; }

        public DateTimeOffset Start { get; set; }

        public DateTimeOffset End { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public bool IsAllDay { get; set; }

        public bool IsVisible { get; set; }

        public string Category { get; set; }
    }
}
