using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherEarthquakeQuery : IQuery<EarthquakeResponse>
    {
        public int? Limit { get; set; }
        public int? Offset { get; set; }
        public string Format { get; set; }
        public string[] AreaName { get; set; }
        public string[] StationName { get; set; }
        public string[] Sort { get; set; }
        public DateTime[] OriginTime { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
    }

    internal class GetEarthquakerQueryHandler : IQueryHandler<GetWeatherEarthquakeQuery, EarthquakeResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetEarthquakerQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public EarthquakeResponse Handle(GetWeatherEarthquakeQuery query)
        {
            return _weatherService.GetEarthquake(query);
        }
    }
}
