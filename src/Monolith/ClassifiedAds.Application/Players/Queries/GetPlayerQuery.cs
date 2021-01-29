using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Players.Queries
{
    public class GetPlayerQuery : IQuery<Player>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetPlayerQueryHandler : IQueryHandler<GetPlayerQuery, Player>
    {
        private readonly IRepository<Player, Guid> _playerRepository;

        public GetPlayerQueryHandler(IRepository<Player, Guid> playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public Player Handle(GetPlayerQuery query)
        {
            var player = _playerRepository.GetAll().FirstOrDefault(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && player == null)
            {
                throw new NotFoundException($"Player {query.Id} not found.");
            }

            return player;
        }
    }
}
