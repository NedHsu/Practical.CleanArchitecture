﻿using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace ClassifiedAds.Application.Players.Queries
{
    public class GetPlayersQuery : IQuery<List<Player>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetPlayersQueryHandler : IQueryHandler<GetPlayersQuery, List<Player>>
    {
        private readonly IRepository<Player, Guid> _playerRepository;

        public GetPlayersQueryHandler(IRepository<Player, Guid> playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<List<Player>> HandleAsync(GetPlayersQuery query, CancellationToken cancellationToken = default)
        {
            return (await _playerRepository.GetAllAsync()).ToList();
        }
    }
}
