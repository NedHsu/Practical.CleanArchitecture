using ClassifiedAds.Domain.Entities;

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

        public void Handle(DeletePlayerCommand command)
        {
            _playerService.Delete(command.Player);
        }
    }
}
