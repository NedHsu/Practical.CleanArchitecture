using System;

namespace ClassifiedAds.Domain.Entities
{
    public class CalendarEvent : AggregateRoot<Guid>
    {
        public DateTimeOffset StartTime { get; set; }

        public DateTimeOffset EndTime { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public Guid? CalendarId { get; set; }

        public Calendar? Calendar { get; set; }

        public Guid CreaterId { get; set; }

        public User Creater { get; set; }

        public bool IsAllDay { get; set; }

        public bool IsVisible { get; set; }

        public string Category { get; set; } = "time";
    }
}