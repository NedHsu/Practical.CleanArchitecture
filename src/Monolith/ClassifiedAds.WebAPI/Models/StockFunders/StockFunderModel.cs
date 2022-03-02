namespace ClassifiedAds.WebAPI.Models.StockFunders
{
    public class StockFunderModel
    {
        public string StockCode { get; set; }
        public string Name { get; set; }
        public string Date { get; set; }
        public decimal? ClosePrice { get; set; }
        public double ForeignBuy { get; set; }
        public double ForeignSell { get; set; }
        public double ForeignSum { get; set; }
        public double ForeignSelfBuy { get; set; }
        public double ForeignSelfSell { get; set; }
        public double ForeignSelfSum { get; set; }
        public double CreditBuy { get; set; }
        public double CreditSell { get; set; }
        public double CreditSum { get; set; }
        public double SelfBuySell { get; set; }
        public double SelfBuy { get; set; }
        public double SelfSell { get; set; }
        public double SelfSum { get; set; }
        public double SelfHedgingBuy { get; set; }
        public double SelfHedgingSell { get; set; }
        public double SelfHedgingSum { get; set; }
        public double Total { get; set; }
    }
}
