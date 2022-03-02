﻿using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;

namespace ClassifiedAds.Application.Weathers.Services
{
    public interface IWeatherService
    {
        CountyResponse GetByCountry(GetWeatherCountyWeatherQuery query);
        EarthquakeResponse GetEarthquake(GetWeatherEarthquakeQuery query);
        RecentResponse GetRecent(GetWeatherRecentQuery query);
        TidalResponse GetTida(GetWeatherTidalQuery query);
        AlarmResponse GetAlarm(GetWeatherAlarmQuery query);
        ObservationResponse GetObservation(GetWeatherObservationQuery query);
    }
}
