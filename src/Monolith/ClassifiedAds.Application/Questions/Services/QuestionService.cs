using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class QuestionService : DapperCrudService<Question>, IQuestionService
    {
        public QuestionService(IBaseDapperRepository<Question> questionRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(questionRepository, domainEvents)
        {
        }
    }
}
