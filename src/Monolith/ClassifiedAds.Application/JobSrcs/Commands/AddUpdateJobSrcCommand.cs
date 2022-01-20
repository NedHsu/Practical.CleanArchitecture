using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateJobSrcCommand command)
        {
            _jobSrcService.AddOrUpdate(command.JobSrc);
        }
    }
}
