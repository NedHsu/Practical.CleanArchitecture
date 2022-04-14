using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.JobSrcs.Commands
{
    public class DeleteJobSrcCommand : ICommand
    {
        public JobSrc JobSrc { get; set; }
    }

    internal class DeleteJobSrcCommandHandler : ICommandHandler<DeleteJobSrcCommand>
    {
        private readonly IDapperCrudService<JobSrc> _jobSrcService;

        public DeleteJobSrcCommandHandler(IDapperCrudService<JobSrc> jobSrcService)
        {
            _jobSrcService = jobSrcService;
        }

        public async Task HandleAsync(DeleteJobSrcCommand command, CancellationToken cancellationToken = default)
        {
            await _jobSrcService.DeleteAsync(command.JobSrc);
        }
    }
}
