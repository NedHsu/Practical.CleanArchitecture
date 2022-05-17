namespace ClassifiedAds.Application.Words.Commands
{
    public class AddUpdateWordCommand : ICommand
    {
        public Word Word { get; set; }
    }

    internal class AddUpdateWordCommandHandler : ICommandHandler<AddUpdateWordCommand>
    {
        private readonly IDapperCrudService<Word> _wordService;

        public AddUpdateWordCommandHandler(IDapperCrudService<Word> wordService)
        {
            _wordService = wordService;
        }

        public async Task HandleAsync(AddUpdateWordCommand command, CancellationToken cancellationToken = default)
        {
            await _wordService.AddOrUpdateAsync(command.Word);
        }
    }
}
