using ClassifiedAds.Application.Weathers.DTOs;
using System.Collections.Generic;

namespace ClassifiedAds.WebAPI.Models.Weathers
{
    public class ObservationLocationModel
    {
        public string Lat { get; set; }
        public string Lon { get; set; }
        public string LocationName { get; set; }
        public string StationId { get; set; }
        public ObservationTime Time { get; set; }
        public Dictionary<string, object> WeatherElement { get; set; }
        public Dictionary<string, object> Parameter { get; set; }
    }
}
