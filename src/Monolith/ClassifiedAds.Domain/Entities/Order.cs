using System;

namespace ClassifiedAds.Domain.Entities
{
    public class Order : AggregateRoot<Guid>
    {
        public string Code { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Status { get; set; }

        public decimal TotalAmount { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public List<OrderItem> Items { get; set; }
    }
}