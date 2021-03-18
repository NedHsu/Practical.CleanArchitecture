using System;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class WeatherDTO
    {
        public Guid Id { get; set; }

        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
