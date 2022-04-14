using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherAlarmQuery : IQuery<AlarmResponse>
    {
        public int? Limit { get; set; }
        public int? Offset { get; set; }
        public string Format { get; set; }
        public string[] LocationName { get; set; }
        public string[] Phenomena { get; set; }
    }

    internal class GetWeatherAlarmQueryHandler : IQueryHandler<GetWeatherAlarmQuery, AlarmResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetWeatherAlarmQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public async Task<AlarmResponse> HandleAsync(GetWeatherAlarmQuery query, CancellationToken cancellationToken = default)
        {
            return await _weatherService.GetAlarm(query);
        }
    }
}
