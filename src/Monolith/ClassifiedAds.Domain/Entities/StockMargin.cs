using System;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockMargin
    {
        [Key]
        public string StockCode { get; set; }
        [Key]
        public DateTime Date { get; set; }
        public int FinancingBuy { get; set; }
        public int FinancingSell { get; set; }
        public int FinancingBack { get; set; }
        public int FinancingBeforeBalance { get; set; }
        public int FinancingBalance { get; set; }
        public int FinancingLimit { get; set; }
        public int SecuritiesBuy { get; set; }
        public int SecuritiesSell { get; set; }
        public int SecuritiesBack { get; set; }
        public int SecuritiesBeforeBalance { get; set; }
        public int SecuritiesBalance { get; set; }
        public int SecuritiesLimit { get; set; }
        public int Offset { get; set; }
        public string Remark { get; set; }
    }
}
