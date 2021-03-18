using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetTidalQuery : IQuery<TidalResponse>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetTidalQueryHandler : IQueryHandler<GetTidalQuery, TidalResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetTidalQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public TidalResponse Handle(GetTidalQuery query)
        {
            return _weatherService.GetTida(query);
        }
    }
}
