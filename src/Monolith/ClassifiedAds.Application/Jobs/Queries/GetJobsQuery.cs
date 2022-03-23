using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Jobs.Queries
{
    public class GetJobsQuery : IQuery<List<Job>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetJobsQueryHandler : IQueryHandler<GetJobsQuery, List<Job>>
    {
        private readonly IBaseDapperRepository<Job> _jobRepository;

        public GetJobsQueryHandler(IBaseDapperRepository<Job> jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public List<Job> Handle(GetJobsQuery query)
        {
            return _jobRepository.GetAll().ToList();
        }
    }
}
