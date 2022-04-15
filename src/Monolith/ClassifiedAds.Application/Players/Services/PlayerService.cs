using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Players.Services
{
    public class PlayerService : CrudService<Player>, IPlayerService
    {
        public PlayerService(IRepository<Player, Guid> playerRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(playerRepository, domainEvents)
        {
        }
    }
}
