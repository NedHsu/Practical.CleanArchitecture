using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class WordService : DapperCrudService<Word>, IWordService
    {
        public WordService(IBaseDapperRepository<Word> wordRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(wordRepository, domainEvents)
        {
        }
    }
}
