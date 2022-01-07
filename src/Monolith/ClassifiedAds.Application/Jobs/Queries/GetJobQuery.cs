using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Jobs.Queries
{
    public class GetJobQuery : IQuery<Job>
    {
        public int Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetJobQueryHandler : IQueryHandler<GetJobQuery, Job>
    {
        private readonly IBaseDapperRepository<Job> _jobRepository;

        public GetJobQueryHandler(IBaseDapperRepository<Job> jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public Job Handle(GetJobQuery query)
        {
            var job = _jobRepository.Get(x => x.Id == query.Id);

            if (query.ThrowNotFoundIfNull && job == null)
            {
                throw new NotFoundException($"Job {query.Id} not found.");
            }

            return job;
        }
    }
}
