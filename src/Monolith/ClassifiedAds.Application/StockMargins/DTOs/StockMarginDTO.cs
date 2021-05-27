using System;

namespace ClassifiedAds.Application.StockMargins.DTOs
{
    public class StockMarginDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
