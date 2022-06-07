namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public class CheckOutParameters
    {
        public string TradeDesc { get; set; }
        public string MerchantTradeNo { get; set; }
        public decimal TotalAmount { get; set; }
        public string PlatformID { get; set; }
        public IEnumerable<PaymentItem> Items { get; set; }
    }
}
