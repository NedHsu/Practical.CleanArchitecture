using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Players.Commands
{
    public class AddUpdatePlayerCommand : ICommand
    {
        public Player Player { get; set; }
    }

    internal class AddUpdatePlayerCommandHandler : ICommandHandler<AddUpdatePlayerCommand>
    {
        private readonly ICrudService<Player> _playerService;

        public AddUpdatePlayerCommandHandler(ICrudService<Player> playerService)
        {
            _playerService = playerService;
        }

        public void Handle(AddUpdatePlayerCommand command)
        {
            _playerService.AddOrUpdate(command.Player);
        }
    }
}
