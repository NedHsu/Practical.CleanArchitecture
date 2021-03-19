using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class CountyResponse
    {
        public string Success { get; set; }
        public CountyRecord Records { get; set; }
    }

    public class CountyRecord
    {
        public List<CountyLocationWeather> Locations { get; set; }
    }

    public class CountyLocationWeather
    {
        public string Dataid { get; set; }
        public string DatasetDescription { get; set; }
        public string LocationsName { get; set; }
        public List<TownshipLocationWeather> Location { get; set; }
    }

    public class TownshipLocationWeather
    {
        public string Geocode { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string LocationName { get; set; }
        public List<TownshipWeatherElement> WeatherElement { get; set; }
    }

    public class TownshipWeatherElement
    {
        public string Description { get; set; }
        public string ElementName { get; set; }
        public List<TownshipWeatherElementTime> Time { get; set; }
    }

    public class TownshipWeatherElementTime
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string DataTime { get; set; }
        public List<TownshipWeatherElementValue> ElementValue { get; set; }
    }

    public class TownshipWeatherElementValue
    {
        public string Measures { get; set; }
        public string Value { get; set; }
    }
}
