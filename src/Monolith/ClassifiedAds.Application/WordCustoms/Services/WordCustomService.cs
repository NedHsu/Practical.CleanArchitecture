using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class WordCustomService : CrudService<WordCustom>, IWordCustomService
    {
        public WordCustomService(IRepository<WordCustom, Guid> wordCustomRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(wordCustomRepository, domainEvents)
        {
        }
    }
}
