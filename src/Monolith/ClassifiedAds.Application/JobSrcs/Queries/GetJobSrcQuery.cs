﻿using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;

namespace ClassifiedAds.Application.JobSrcs.Queries
{
    public class GetJobSrcQuery : IQuery<JobSrc>
    {
        public int Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetJobSrcQueryHandler : IQueryHandler<GetJobSrcQuery, JobSrc>
    {
        private readonly IBaseDapperRepository<JobSrc> _jobSrcRepository;

        public GetJobSrcQueryHandler(IBaseDapperRepository<JobSrc> jobSrcRepository)
        {
            _jobSrcRepository = jobSrcRepository;
        }

        public async Task<JobSrc> HandleAsync(GetJobSrcQuery query, CancellationToken cancellationToken = default)
        {
            var jobSrc = await _jobSrcRepository.GetAsync(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && jobSrc == null)
            {
                throw new NotFoundException($"JobSrc {query.Id} not found.");
            }

            return jobSrc;
        }
    }
}
