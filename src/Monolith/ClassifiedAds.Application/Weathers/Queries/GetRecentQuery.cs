using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Application.Weathers.Services;
using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetRecentQuery : IQuery<RecentResponse>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetRecentQueryHandler : IQueryHandler<GetRecentQuery, RecentResponse>
    {
        private readonly IWeatherService _weatherService;

        public GetRecentQueryHandler(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        public RecentResponse Handle(GetRecentQuery query)
        {
            return _weatherService.GetRecent(query);
        }
    }
}
