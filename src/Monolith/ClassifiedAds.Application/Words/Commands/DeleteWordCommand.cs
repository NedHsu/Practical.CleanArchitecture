namespace ClassifiedAds.Application.Words.Commands
{
    public class DeleteWordCommand : ICommand
    {
        public Word Word { get; set; }
    }

    internal class DeleteWordCommandHandler : ICommandHandler<DeleteWordCommand>
    {
        private readonly IDapperCrudService<Word> _wordService;

        public DeleteWordCommandHandler(IDapperCrudService<Word> wordService)
        {
            _wordService = wordService;
        }

        public async Task HandleAsync(DeleteWordCommand command, CancellationToken cancellationToken = default)
        {
            await _wordService.DeleteAsync(command.Word);
        }
    }
}
