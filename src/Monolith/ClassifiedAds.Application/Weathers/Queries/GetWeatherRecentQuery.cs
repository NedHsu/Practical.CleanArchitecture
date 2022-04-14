using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using System;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherRecentQuery : IQuery<RecentResponse>
    {
        public int? Limit { get; set; }
        public int? Offset { get; set; }
        public string Format { get; set; }
        public string[] LocationName { get; set; }
        public string[] ElementName { get; set; }
        public string Sort { get; set; }
        public DateTime[] StartTime { get; set; }
        public DateTime? TimeFrom { get; set; }
        public DateTime? TimeTo { get; set; }
    }

    internal class GetRecentQueryHandler : IQueryHandler<GetWeatherRecentQuery, RecentResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetRecentQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public async Task<RecentResponse> HandleAsync(GetWeatherRecentQuery query, CancellationToken cancellationToken = default)
        {
            return await _weatherService.GetRecent(query);
        }
    }
}
