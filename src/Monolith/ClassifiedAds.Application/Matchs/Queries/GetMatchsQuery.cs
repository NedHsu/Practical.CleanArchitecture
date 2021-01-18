using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Matchs.Queries
{
    public class GetMatchsQuery : IQuery<List<Match>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetMatchsQueryHandler : IQueryHandler<GetMatchsQuery, List<Match>>
    {
        private readonly IRepository<Match, Guid> _matchRepository;

        public GetMatchsQueryHandler(IRepository<Match, Guid> matchRepository)
        {
            _matchRepository = matchRepository;
        }

        public List<Match> Handle(GetMatchsQuery query)
        {
            return _matchRepository.GetAll().ToList();
        }
    }
}
