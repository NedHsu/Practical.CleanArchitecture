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

        public void Handle(DeleteJobSrcCommand command)
        {
            _jobSrcService.Delete(command.JobSrc);
        }
    }
}
