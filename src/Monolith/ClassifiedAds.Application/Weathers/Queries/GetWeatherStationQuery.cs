using ClassifiedAds.Application.Weathers.DTOs;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Weathers.Queries
{
    public class GetWeatherStationQuery : IQuery<List<WeatherStationDTO>>
    {
    }

    internal class GetStationQueryHandler : IQueryHandler<GetWeatherStationQuery, List<WeatherStationDTO>>
    {
        private readonly IRepository<WeatherStation, Guid> _repository;

        public GetStationQueryHandler(IRepository<WeatherStation, Guid> repository)
        {
            _repository = repository;
        }

        public async Task<List<WeatherStationDTO>> HandleAsync(GetWeatherStationQuery query, CancellationToken cancellationToken = default)
        {
            var result = await _repository.GetAllAsync();
            return result.Where(x => x.Layer == 10)
                    .Select(x => new WeatherStationDTO { County = x.County, Lat = x.Lat, Lon = x.Lon })
                    .ToList()
                    .GroupBy(x => x.County)
                    .Select(x => x.First())
                    .ToList();
        }
    }
}
