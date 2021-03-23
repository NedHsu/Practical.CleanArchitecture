using System;

namespace ClassifiedAds.WebAPI.Models.Locations
{
    public class LocationModel
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public double Longitude { get; internal set; }

        public double Latitude { get; internal set; }
    }
}
