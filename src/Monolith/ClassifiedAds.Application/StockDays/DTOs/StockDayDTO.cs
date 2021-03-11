using System;

namespace ClassifiedAds.Application.StockDays.DTOs
{
    public class StockDayDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
