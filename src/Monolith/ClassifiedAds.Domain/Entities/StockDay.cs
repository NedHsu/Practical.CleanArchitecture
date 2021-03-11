using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockDay
    {
        [Key]
        public string StockCode { get; set; }
        [Key]
        public DateTime Date { get; set; }
        public long? DealAmount { get; set; }
        public long? DealMoney { get; set; }
        public decimal? OpenPrice { get; set; }
        public decimal? HighestPrice { get; set; }
        public decimal? LowestPrice { get; set; }
        public decimal? ClosePrice { get; set; }
        public int? DealCount { get; set; }

        public virtual Stock StockCodeNavigation { get; set; }
    }
}
