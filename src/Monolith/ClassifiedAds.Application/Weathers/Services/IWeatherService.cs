using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Queries;

namespace ClassifiedAds.Application.Weathers.Services
{
    public interface IWeatherService
    {
        Task<CountyResponse> GetByCountry(GetWeatherCountyWeatherQuery query);
        Task<EarthquakeResponse> GetEarthquake(GetWeatherEarthquakeQuery query);
        Task<RecentResponse> GetRecent(GetWeatherRecentQuery query);
        Task<TidalResponse> GetTida(GetWeatherTidalQuery query);
        Task<AlarmResponse> GetAlarm(GetWeatherAlarmQuery query);
        Task<ObservationResponse> GetObservation(GetWeatherObservationQuery query);
    }
}
