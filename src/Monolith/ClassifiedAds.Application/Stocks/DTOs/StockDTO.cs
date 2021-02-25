using System;

namespace ClassifiedAds.Application.Stocks.DTOs
{
    public class StockDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
