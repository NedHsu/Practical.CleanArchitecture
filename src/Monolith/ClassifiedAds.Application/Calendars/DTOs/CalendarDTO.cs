using System;

namespace ClassifiedAds.Application.Calendars.DTOs
{
    public class CalendarDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
