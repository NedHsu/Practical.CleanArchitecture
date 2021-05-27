using System;

namespace ClassifiedAds.Application.StockSeminars.DTOs
{
    public class StockSeminarDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
