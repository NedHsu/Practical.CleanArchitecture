using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.JobSrcs.Queries
{
    public class GetJobSrcQuery : IQuery<JobSrc>
    {
        public string Provider { get; set; }
        public string Name { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetJobSrcQueryHandler : IQueryHandler<GetJobSrcQuery, JobSrc>
    {
        private readonly IBaseDapperRepository<JobSrc> _jobSrcRepository;

        public GetJobSrcQueryHandler(IBaseDapperRepository<JobSrc> jobSrcRepository)
        {
            _jobSrcRepository = jobSrcRepository;
        }

        public JobSrc Handle(GetJobSrcQuery query)
        {
            var jobSrc = _jobSrcRepository.Get(x => x.Provider == query.Provider && x.Name == query.Name);

            if (query.ThrowNotFoundIfNull && jobSrc == null)
            {
                throw new NotFoundException($"JobSrc {query.Provider} {query.Name} not found.");
            }

            return jobSrc;
        }
    }
}
