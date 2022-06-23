using System;

namespace ClassifiedAds.WebAPI.Models.Orders
{
    public class OrderItemModel
    {
        public Guid? Id { get; set; }

        public string Name { get; set; }

        public int Quantity { get; set; }

        public string Remark { get; set; }

        public Guid ProductId { get; set; }
    }
}
