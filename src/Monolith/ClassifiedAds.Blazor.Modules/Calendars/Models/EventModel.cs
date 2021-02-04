using System;
using System.ComponentModel.DataAnnotations;

namespace ClassifiedAds.Blazor.Modules.Calendars.Models {
    public class EventModel {
        public Guid Id { get; set; }
        
        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public string Color { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime UpdateTime { get; set; }
    }
}