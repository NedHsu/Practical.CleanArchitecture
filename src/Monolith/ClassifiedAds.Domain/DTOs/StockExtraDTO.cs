using ClassifiedAds.Domain.Entities;
using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class StockExtraDTO : Stock
    {
        public decimal? EPS { get; set; }
        public decimal? P_EPS { get; set; }
        public decimal? PE { get; set; }
        public decimal? P_PE { get; set; }
        public decimal? GrowthRatio { get; set; }
        public int? Year { get; set; }
        public int? P_Year { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}
