using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.JobSrcs.Commands
{
    public class AddUpdateJobSrcCommand : ICommand
    {
        public JobSrc JobSrc { get; set; }
    }

    internal class AddUpdateJobSrcCommandHandler : ICommandHandler<AddUpdateJobSrcCommand>
    {
        private readonly IDapperCrudService<JobSrc> _jobSrcService;

        public AddUpdateJobSrcCommandHandler(IDapperCrudService<JobSrc> jobSrcService)
        {
            _jobSrcService = jobSrcService;
        }

        public async Task HandleAsync(AddUpdateJobSrcCommand command, CancellationToken cancellationToken = default)
        {
            await _jobSrcService.AddOrUpdateAsync(command.JobSrc);
        }
    }
}
