using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Jobs.Commands
{
    public class DeleteJobCommand : ICommand
    {
        public Job Job { get; set; }
    }

    internal class DeleteJobCommandHandler : ICommandHandler<DeleteJobCommand>
    {
        private readonly IDapperCrudService<Job> _jobService;

        public DeleteJobCommandHandler(IDapperCrudService<Job> jobService)
        {
            _jobService = jobService;
        }

        public void Handle(DeleteJobCommand command)
        {
            _jobService.Delete(command.Job);
        }
    }
}
