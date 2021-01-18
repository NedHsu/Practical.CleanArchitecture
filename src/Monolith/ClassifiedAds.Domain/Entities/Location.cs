using System;

namespace ClassifiedAds.Domain.Entities {
    public class Location : AggregateRoot<Guid> {
        
        public string Name { get; set; }

        public string Description { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}