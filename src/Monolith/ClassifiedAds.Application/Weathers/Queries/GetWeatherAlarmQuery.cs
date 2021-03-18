using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherAlarmQuery : IQuery<AlarmResponse>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetWeatherAlarmQueryHandler : IQueryHandler<GetWeatherAlarmQuery, AlarmResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetWeatherAlarmQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public AlarmResponse Handle(GetWeatherAlarmQuery query)
        {
            return _weatherService.GetAlarm(query);
        }
    }
}
