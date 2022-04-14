using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.Matchs.Commands
{
    public class AddUpdateMatchCommand : ICommand
    {
        public Match Match { get; set; }
    }

    internal class AddUpdateMatchCommandHandler : ICommandHandler<AddUpdateMatchCommand>
    {
        private readonly ICrudService<Match> _matchService;

        public AddUpdateMatchCommandHandler(ICrudService<Match> matchService)
        {
            _matchService = matchService;
        }

        public async Task HandleAsync(AddUpdateMatchCommand command, CancellationToken cancellationToken = default)
        {
            await _matchService.AddOrUpdateAsync(command.Match);
        }
    }
}
