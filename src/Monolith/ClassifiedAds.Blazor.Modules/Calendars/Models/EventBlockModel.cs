using System;

namespace ClassifiedAds.Blazor.Modules.Calendars.Models
{
    public class EventBlockModel
    {
        public Guid Id { get; set; }

        public int StartIndex { get; set; }

        public bool BeforeStart { get; set; }

        public int EndIndex { get; set; }

        public bool AfterEnd { get; set; }

        public string Color { get; set; }

        public string Title { get; set; }
    }
}