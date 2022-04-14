using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using System;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherTidalQuery : IQuery<TidalResponse>
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

    internal class GetTidalQueryHandler : IQueryHandler<GetWeatherTidalQuery, TidalResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetTidalQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public async Task<TidalResponse> HandleAsync(GetWeatherTidalQuery query, CancellationToken cancellationToken = default)
        {
            return await _weatherService.GetTida(query);
        }
    }
}
