using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeathersQuery : IQuery<List<WeatherDTO>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetWeathersQueryHandler : IQueryHandler<GetWeathersQuery, List<WeatherDTO>>
    {
        private readonly IWeatherService _weatherService;

        public GetWeathersQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public List<WeatherDTO> Handle(GetWeathersQuery query)
        {
            return _weatherService.GetAll();
        }
    }
}
