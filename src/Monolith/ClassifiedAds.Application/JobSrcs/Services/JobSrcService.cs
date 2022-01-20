using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class JobSrcService : DapperCrudService<JobSrc>, IJobSrcService
    {
        public JobSrcService(IBaseDapperRepository<JobSrc> jobSrcRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(jobSrcRepository, domainEvents)
        {
        }
    }
}
