using System;

namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public class CheckOutParameters
    {
        public string MerchantTradeNo { get; set; }
        public string TradeDesc { get; set; }
        public decimal TotalAmount { get; set; }
        public string PlatformID { get; set; }
        public IEnumerable<PaymentItem> Items { get; set; }
        public DateTime MerchantTradeDate { get; set; }
    }
}
