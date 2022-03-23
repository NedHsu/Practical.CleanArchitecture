namespace ClassifiedAds.WebAPI.Models.StockMargins
{
    public class StockMarginFundersModel
    {
        public string[] Date { get; set; }
        public int[] ForeignBuy { get; set; }
        public int[] ForeignSell { get; set; }
        public int[] ForeignSum { get; set; }
        public int[] ForeignSelfBuy { get; set; }
        public int[] ForeignSelfSell { get; set; }
        public int[] ForeignSelfSum { get; set; }
        public int[] CreditBuy { get; set; }
        public int[] CreditSell { get; set; }
        public int[] CreditSum { get; set; }
        public int[] SelfBuySell { get; set; }
        public int[] SelfBuy { get; set; }
        public int[] SelfSell { get; set; }
        public int[] SelfSum { get; set; }
        public int[] SelfHedgingBuy { get; set; }
        public int[] SelfHedgingSell { get; set; }
        public int[] SelfHedgingSum { get; set; }
        public int[] Total { get; set; }
        public int[] FinancingBuy { get; set; }
        public int[] FinancingSell { get; set; }
        public int[] FinancingBack { get; set; }
        public int[] FinancingBeforeBalance { get; set; }
        public int[] FinancingBalance { get; set; }
        public int[] FinancingLimit { get; set; }
        public int[] SecuritiesBuy { get; set; }
        public int[] SecuritiesSell { get; set; }
        public int[] SecuritiesBack { get; set; }
        public int[] SecuritiesBeforeBalance { get; set; }
        public int[] SecuritiesBalance { get; set; }
        public int[] SecuritiesLimit { get; set; }
        public int[] Offset { get; set; }
        public string[] Remark { get; set; }
    }
}
