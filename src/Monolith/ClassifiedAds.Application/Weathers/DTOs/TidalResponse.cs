using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.DTOs
{
    public class TidalResponse
    {
        public string Success { get; set; }
        public TidalRecord Records { get; set; }
    }

    public class TidalRecord
    {
        public string Note { get; set; }
        public List<TidalLocation> Location { get; set; }
    }

    public class TidalLocation
    {
        public string LocationName { get; set; }
        public string StationId { get; set; }
        public List<TidalValidTime> ValidTime { get; set; }
    }

    public class TidalValidTime
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public List<TidalWeatherElement> WeatherElement { get; set; }

    }

    public class TidalWeatherElement
    {
        public string ElementName { get; set; }
        public string ElementValue { get; set; }
        public List<TidalWeatherElementTime> Time { get; set; }
    }

    public class TidalWeatherElementTime
    {
        public string DataTime { get; set; }
        public List<TidalWeatherElementParameter> Parameter { get; set; }
    }

    public class TidalWeatherElementParameter
    {
        public string ParameterName { get; set; }
        public string ParameterValue { get; set; }
        public string ParameterMeasure { get; set; }
    }
}
