using System;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class WeatherCounty : AggregateRoot<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public int Days { get; set; }
    }
}
