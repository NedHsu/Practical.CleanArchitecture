using System;

namespace ClassifiedAds.Domain.Entities
{
    public class OrderItem : AggregateRoot<Guid>
    {
        public decimal Price { get; set; }

        public int Quantity { get; set; }

        public string Remark { get; set; }

        public Guid ProductId { get; set; }
        public Product Product { get; set; }

        public Guid OrderId { get; set; }
        public Order Order { get; set; }
    }
}