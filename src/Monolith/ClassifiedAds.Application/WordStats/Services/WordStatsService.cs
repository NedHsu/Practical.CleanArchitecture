using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class WordStatsService : DapperCrudService<WordStats>, IWordStatsService
    {
        public WordStatsService(IBaseDapperRepository<WordStats> wordStatRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(wordStatRepository, domainEvents)
        {
        }
    }
}
