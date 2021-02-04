using System;

namespace ClassifiedAds.Application.Locations.DTOs
{
    public class LocationDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
