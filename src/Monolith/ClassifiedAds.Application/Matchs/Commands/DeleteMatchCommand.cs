using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Matchs.Commands
{
    public class DeleteMatchCommand : ICommand
    {
        public Match Match { get; set; }
    }

    internal class DeleteMatchCommandHandler : ICommandHandler<DeleteMatchCommand>
    {
        private readonly ICrudService<Match> _matchService;

        public DeleteMatchCommandHandler(ICrudService<Match> matchService)
        {
            _matchService = matchService;
        }

        public async Task HandleAsync(DeleteMatchCommand command, CancellationToken cancellationToken = default)
        {
            await _matchService.DeleteAsync(command.Match);
        }
    }
}
