using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.Services
{
    public class JobService : DapperCrudService<Job>, IJobService
    {
        public JobService(IBaseDapperRepository<Job> jobRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(jobRepository, domainEvents)
        {
        }
    }
}
