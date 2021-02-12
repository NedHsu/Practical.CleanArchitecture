using System;

namespace ClassifiedAds.Application.CalendarEvents.DTOs
{
    public class CalendarEventDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
