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

        public List<Location> Handle(GetLocationsQuery query)
        {
            return _locationRepository.GetAll().ToList();
        }
    }
}
