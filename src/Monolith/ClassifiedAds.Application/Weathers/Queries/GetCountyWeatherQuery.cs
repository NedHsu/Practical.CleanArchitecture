using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetCountyWeatherQuery : IQuery<CountyResponse>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
        public string Country { get; set; }
    }

    internal class GetCountyWeatherQueryHandler : IQueryHandler<GetCountyWeatherQuery, CountyResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetCountyWeatherQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public CountyResponse Handle(GetCountyWeatherQuery query)
        {
            return _weatherService.GetByCountry(query);
        }
    }
}
