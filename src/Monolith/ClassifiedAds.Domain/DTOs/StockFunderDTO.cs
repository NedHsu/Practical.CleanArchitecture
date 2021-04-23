using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class StockFunderDTO : Entities.StockFunder
    {
        public string Name { get; set; }
        public decimal? ClosePrice { get; set; }
    }
}
