using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class RecentResponse
    {
        public string Success { get; set; }
        public List<RecentRecord> Records { get; set; }
    }

    public class RecentRecord
    {
        public string DatasetDescription { get; set; }
        public List<LocationWeather> Locations { get; set; }
    }

    public class LocationWeather
    {
        public string LocationName { get; set; }
        public List<WeatherElement> WeatherElement { get; set; }
    }

    public class WeatherElement
    {
        public string ElementName { get; set; }
        public List<DateTime> WeatherElementTime { get; set; }
    }

    public class WeatherElementTime
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public WeatherElementParameter Parameter { get; set; }
    }

    public class WeatherElementParameter
    {
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
    }
}
