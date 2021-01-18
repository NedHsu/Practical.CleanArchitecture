using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Matchs.Services
{
    public class MatchService : CrudService<Match>, IMatchService
    {
        public MatchService(IRepository<Match, Guid> matchRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(matchRepository, domainEvents)
        {
        }
    }
}
