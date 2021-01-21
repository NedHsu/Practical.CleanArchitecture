using System;
using System.Collections.Generic;
using System.Linq;
using ClassifiedAds.Application.Common.DTOs;
using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Matchs.Queries {
    public class GetMatchPagedQuery : IQuery<PagedResult<Match>> {

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? Type { get; set; }

        public Guid? CreaterId { get; set; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }
        
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetMatchPagedQueryHandler : IQueryHandler<GetMatchPagedQuery, PagedResult<Match>> {
        private readonly IRepository<Match, Guid> _matchRepository;

        public GetMatchPagedQueryHandler(IRepository<Match, Guid> matchRepository) {
            _matchRepository = matchRepository;
        }

        public PagedResult<Match> Handle(GetMatchPagedQuery options) {
            var query = _matchRepository.GetAll();
            if (options.StartDate.HasValue && options.EndDate.HasValue)
            {
                query = query.Where(x => options.StartDate > x.Time && options.EndDate < x.Time);
            }
            if (options.CreaterId.HasValue)
            {
                
            }
            if (options.Type.HasValue)
            {
                
            }
            return PagedResult<Match>.Create(query, options.PageIndex, options.PageSize);
        }
    }
}