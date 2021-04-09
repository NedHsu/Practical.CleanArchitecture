using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockRevenue
    {
        [Key]
        public string StockCode { get; set; }
        [Key]
        public DateTime Date { get; set; }
        public decimal CurrentMonth { get; set; }
        public decimal PreMonth { get; set; }
        public decimal PreYearMonth { get; set; }
        public decimal MoM { get; set; }
        public decimal YoY { get; set; }
        public decimal YearTotal { get; set; }
        public decimal PreYearTotal { get; set; }
        public decimal TotalMoM { get; set; }
        public string Remarks { get; set; }
    }
}
