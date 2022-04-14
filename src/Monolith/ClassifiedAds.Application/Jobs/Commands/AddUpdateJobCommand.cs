using ClassifiedAds.Domain.Entities;
using System.Threading;

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

        public async Task HandleAsync(AddUpdateJobCommand command, CancellationToken cancellationToken = default)
        {
            await _jobService.AddOrUpdateAsync(command.Job);
        }
    }
}
