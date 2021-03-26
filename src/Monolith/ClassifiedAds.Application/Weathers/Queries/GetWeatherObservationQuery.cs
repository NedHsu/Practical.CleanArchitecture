using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherObservationQuery : IQuery<ObservationResponse>
    {
        public int? Limit { get; set; }
        public int? Offset { get; set; }
        public string Format { get; set; }
        public string[] LocationName { get; set; }
        public string[] ElementName { get; set; }
        public string[] ParameterName { get; set; }
        public DateTime[] OriginTime { get; set; }
        public DateTime TimeFrom { get; set; }
        public DateTime TimeTo { get; set; }
        public ObservationType Type { get; set; }
    }

    internal class GetObservationrQueryHandler : IQueryHandler<GetWeatherObservationQuery, ObservationResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetObservationrQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public ObservationResponse Handle(GetWeatherObservationQuery query)
        {
            return _weatherService.GetObservation(query);
        }
    }
}
