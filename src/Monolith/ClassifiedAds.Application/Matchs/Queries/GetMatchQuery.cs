﻿using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Matchs.Queries
{
    public class GetMatchQuery : IQuery<Match>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetMatchQueryHandler : IQueryHandler<GetMatchQuery, Match>
    {
        private readonly IRepository<Match, Guid> _matchRepository;

        public GetMatchQueryHandler(IRepository<Match, Guid> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public Match Handle(GetMatchQuery query)
        {
            var match = _matchRepository.GetAll().FirstOrDefault(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && match == null)
            {
                throw new NotFoundException($"Match {query.Id} not found.");
            }

            return match;
        }
    }
}