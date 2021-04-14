using System;

namespace ClassifiedAds.WebAPI.Models.StockFunders
{
    public class StockFunderModel
    {
        public string StockCode { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public int ForeignBuy { get; set; }
        public int ForeignSell { get; set; }
        public int ForeignSum { get; set; }
        public int ForeignSelfBuy { get; set; }
        public int ForeignSelfSell { get; set; }
        public int ForeignSelfSum { get; set; }
        public int CreditBuy { get; set; }
        public int CreditSell { get; set; }
        public int CreditSum { get; set; }
        public int SelfBuySell { get; set; }
        public int SelfBuy { get; set; }
        public int SelfSell { get; set; }
        public int SelfSum { get; set; }
        public int SelfHedgingBuy { get; set; }
        public int SelfHedgingSell { get; set; }
        public int SelfHedgingSum { get; set; }
        public int Total { get; set; }
    }
}
