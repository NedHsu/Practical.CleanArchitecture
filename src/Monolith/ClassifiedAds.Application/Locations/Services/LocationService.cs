using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Locations.Services
{
    public class LocationService : CrudService<Location>, ILocationService
    {
        public LocationService(IRepository<Location, Guid> locationRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(locationRepository, domainEvents)
        {
        }
    }
}
