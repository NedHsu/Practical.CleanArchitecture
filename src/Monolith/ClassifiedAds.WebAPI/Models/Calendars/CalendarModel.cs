using System;

namespace ClassifiedAds.WebAPI.Models.Calendars
{
    public class CalendarModel
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Color { get; set; }

        public string BgColor { get; set; }

        public string DragBgColor { get; set; }

        public string BorderColor { get; set; }

        public int CategoryId { get; set; }

        public string CategoryName { get; set; }
    }
}
