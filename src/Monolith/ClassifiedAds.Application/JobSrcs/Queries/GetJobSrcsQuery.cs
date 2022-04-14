using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.JobSrcs.Queries
{
    public class GetJobSrcsQuery : IQuery<List<JobSrc>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetJobSrcsQueryHandler : IQueryHandler<GetJobSrcsQuery, List<JobSrc>>
    {
        private readonly IBaseDapperRepository<JobSrc> _jobSrcRepository;

        public GetJobSrcsQueryHandler(IBaseDapperRepository<JobSrc> jobSrcRepository)
        {
            _jobSrcRepository = jobSrcRepository;
        }

        public async Task<List<JobSrc>> HandleAsync(GetJobSrcsQuery query, CancellationToken cancellationToken = default)
        {
            return (await _jobSrcRepository.GetAllAsync()).ToList();
        }
    }
}
