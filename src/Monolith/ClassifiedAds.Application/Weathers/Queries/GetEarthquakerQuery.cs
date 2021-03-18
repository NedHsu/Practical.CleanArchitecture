using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetEarthquakerQuery : IQuery<EarthquakeResponse>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetEarthquakerQueryHandler : IQueryHandler<GetEarthquakerQuery, EarthquakeResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetEarthquakerQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public EarthquakeResponse Handle(GetEarthquakerQuery query)
        {
            return _weatherService.GetEarthquake(query);
        }
    }
}
