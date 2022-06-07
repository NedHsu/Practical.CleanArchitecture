using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClassifiedAds.Domain.Infrastructure.Payment
{
    public class PaymentActionParameters
    {
        public PaymentAction Action { get; set; }
        public string MerchantTradeNo { get; set; }
        public string TradeNo { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
