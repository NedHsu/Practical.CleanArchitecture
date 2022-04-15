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

        public async Task HandleAsync(AddUpdatePlayerCommand command, CancellationToken cancellationToken = default)
        {
            await _playerService.AddOrUpdateAsync(command.Player);
        }
    }
}
