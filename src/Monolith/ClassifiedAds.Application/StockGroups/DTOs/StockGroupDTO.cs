using System;

namespace ClassifiedAds.Application.StockGroups.DTOs
{
    public class StockGroupDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
