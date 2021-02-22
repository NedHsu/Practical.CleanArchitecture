using System;
using System.Collections.Generic;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockFundamental
    {
        public string StockCode { get; set; }
        public string StockName { get; set; }
        public DateTime Date { get; set; }
        public decimal? YieldRate { get; set; }
        public int? DividendYear { get; set; }
        public decimal? PeRatio { get; set; }
        public decimal? PriceNetRatio { get; set; }
        public string ReportYearQuarter { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
    }
}
