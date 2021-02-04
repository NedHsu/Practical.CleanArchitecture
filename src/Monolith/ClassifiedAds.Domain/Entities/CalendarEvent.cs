using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities {
    public class CalendarEvent : AggregateRoot<Guid> {
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public Guid CreaterId { get; set; }
        public User Creater { get; set; }

    }
}