using System;

namespace ClassifiedAds.Application.Orders.DTOs
{
    public class OrderDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
