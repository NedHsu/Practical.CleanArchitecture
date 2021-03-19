using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherCountyWeatherQuery : IQuery<CountyResponse>
    {
        public string Country { get; set; }
        public string[] LocationName { get; set; }
        public string[] ElementName { get; set; }
        public string Sort { get; set; }
        public DateTime[] StartTime { get; set; }
        public DateTime[] DataTime { get; set; }
        public DateTime? TimeFrom { get; set; }
        public DateTime? TimeTo { get; set; }
    }

    internal class GetCountyWeatherQueryHandler : IQueryHandler<GetWeatherCountyWeatherQuery, CountyResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetCountyWeatherQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public CountyResponse Handle(GetWeatherCountyWeatherQuery query)
        {
            return _weatherService.GetByCountry(query);
        }
    }
}
