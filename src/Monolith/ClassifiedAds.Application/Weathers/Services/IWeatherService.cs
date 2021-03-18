using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;
using ClassifiedAds.Domain.Entities;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Weathers.Services
{
    public interface IWeatherService
    {
        List<WeatherDTO> GetAll();
        CountyResponse GetByCountry(GetCountyWeatherQuery query);
        EarthquakeResponse GetEarthquake(GetEarthquakerQuery query);
        RecentResponse GetRecent(GetRecentQuery query);
        TidalResponse GetTida(GetTidalQuery query);
        AlarmResponse GetAlarm(GetWeatherAlarmQuery query);
    }
}
