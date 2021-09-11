using System;

namespace ClassifiedAds.Application.CalendarCategories.DTOs
{
    public class CalendarCategoryDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
