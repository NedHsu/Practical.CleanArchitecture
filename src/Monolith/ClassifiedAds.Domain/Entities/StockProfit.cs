using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockProfit
    {
        [Key]
        public string StockCode { get; set; }
        [Key]
        public DateTime Date { get; set; }
        public decimal Revenue { get; set; }
        public decimal Gross { get; set; }
        public decimal OperatingProfit { get; set; }
        public decimal UntaxedNetProfit { get; set; }
        public decimal NetProfit { get; set; }
    }
}
