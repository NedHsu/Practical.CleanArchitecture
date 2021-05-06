using ClassifiedAds.Application.Weathers.DTOs;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Models.Weathers
{
    public class RecentLocationModel
    {
        public string LocationName { get; set; }
        public string Lat { get; set; }
        public string Lon { get; set; }
        public List<RecentLocationModelTime> Times { get; set; }
    }

    public class RecentLocationModelTime
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public Dictionary<string, WeatherElementParameter> WeatherElement { get; set; }
    }
}
