using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockFundamental
    {
        [Key]
        public string StockCode { get; set; }
        public string StockName { get; set; }
        [Key]
        public DateTime Date { get; set; }
        public decimal? YieldRate { get; set; }
        public int? DividendYear { get; set; }
        public decimal? PERatio { get; set; }
        public decimal? PriceNetRatio { get; set; }
        public string ReportYearQuarter { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Updated { get; set; }
    }
}
