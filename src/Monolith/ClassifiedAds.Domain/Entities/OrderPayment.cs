using System;

namespace ClassifiedAds.Domain.Entities
{
    public class OrderPayment : AggregateRoot<Guid>
    {
        public DateTime TradeDate { get; set; }

        public string TradeNo { get; set; }

        public decimal TotalAmount { get; set; }

        public int Status { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}