using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Locations.Queries
{
    public class GetLocationQuery : IQuery<Location>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetLocationQueryHandler : IQueryHandler<GetLocationQuery, Location>
    {
        private readonly IRepository<Location, Guid> _locationRepository;

        public GetLocationQueryHandler(IRepository<Location, Guid> locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<Location> HandleAsync(GetLocationQuery query, CancellationToken cancellationToken = default)
        {
            var location = await _locationRepository.FirstOrDefaultAsync(_locationRepository.GetAll().Where(x => x.Id == query.Id));

            if (query.ThrowNotFoundIfNull && location == null)
            {
                throw new NotFoundException($"Location {query.Id} not found.");
            }

            return location;
        }
    }
}
