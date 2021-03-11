using System;

namespace ClassifiedAds.Application.StockFundamentals.DTOs
{
    public class StockFundamentalDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
