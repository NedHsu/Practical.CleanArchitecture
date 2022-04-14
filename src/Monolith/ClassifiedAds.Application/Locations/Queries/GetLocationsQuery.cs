using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Locations.Queries
{
    public class GetLocationsQuery : IQuery<List<Location>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetLocationsQueryHandler : IQueryHandler<GetLocationsQuery, List<Location>>
    {
        private readonly IRepository<Location, Guid> _locationRepository;

        public GetLocationsQueryHandler(IRepository<Location, Guid> locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<List<Location>> HandleAsync(GetLocationsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _locationRepository.GetAllAsync()).ToList();
        }
    }
}
