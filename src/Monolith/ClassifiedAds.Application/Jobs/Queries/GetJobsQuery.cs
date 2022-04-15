using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;

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

        public async Task<List<Job>> HandleAsync(GetJobsQuery query, CancellationToken cancellationToken = default)
        {
            var list = await _jobRepository.GetAllAsync();
            return list.ToList();
        }
    }
}
