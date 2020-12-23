using System;

namespace ClassifiedAds.Domain.Entities {
    public class Location : AggregateRoot<Guid> {
        
        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Longitude { get; set; }

        public decimal Latitude { get; set; }
    }
}