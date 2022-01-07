using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Jobs.Commands
{
    public class AddUpdateJobCommand : ICommand
    {
        public Job Job { get; set; }
    }

    internal class AddUpdateJobCommandHandler : ICommandHandler<AddUpdateJobCommand>
    {
        private readonly IDapperCrudService<Job> _jobService;

        public AddUpdateJobCommandHandler(IDapperCrudService<Job> jobService)
        {
            _jobService = jobService;
        }

        public void Handle(AddUpdateJobCommand command)
        {
            _jobService.AddOrUpdate(command.Job);
        }
    }
}
