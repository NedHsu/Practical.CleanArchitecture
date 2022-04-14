using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.Players.Commands
{
    public class DeletePlayerCommand : ICommand
    {
        public Player Player { get; set; }
    }

    internal class DeletePlayerCommandHandler : ICommandHandler<DeletePlayerCommand>
    {
        private readonly ICrudService<Player> _playerService;

        public DeletePlayerCommandHandler(ICrudService<Player> playerService)
        {
            _playerService = playerService;
        }

        public async Task HandleAsync(DeletePlayerCommand command, CancellationToken cancellationToken = default)
        {
            await _playerService.DeleteAsync(command.Player);
        }
    }
}
