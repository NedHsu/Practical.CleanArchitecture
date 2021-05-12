using System;

namespace ClassifiedAds.Application.StockProfits.DTOs
{
    public class StockProfitDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
