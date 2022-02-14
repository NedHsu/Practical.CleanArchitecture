using System;

namespace ClassifiedAds.Domain.DTOs
{
    public class StockEPSDTO
    {
        public string StockCode { get; set; }
        public string Name { get; set; }
        public string Industry { get; set; }
        public decimal? ClosePrice { get; set; }
        public decimal? TwentyPrice { get; set; }
        public decimal? SixtyPrice { get; set; }
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
