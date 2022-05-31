namespace ClassifiedAds.Application.WordCustoms.Commands
{
    public class AddUpdateWordCustomCommand : ICommand
    {
        public WordCustom WordCustom { get; set; }
    }

    internal class AddUpdateWordCustomCommandHandler : ICommandHandler<AddUpdateWordCustomCommand>
    {
        private readonly ICrudService<WordCustom> _wordCustomService;

        public AddUpdateWordCustomCommandHandler(ICrudService<WordCustom> wordCustomService)
        {
            _wordCustomService = wordCustomService;
        }

        public async Task HandleAsync(AddUpdateWordCustomCommand command, CancellationToken cancellationToken = default)
        {
            await _wordCustomService.AddOrUpdateAsync(command.WordCustom);
        }
    }
}
