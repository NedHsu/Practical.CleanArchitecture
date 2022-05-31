namespace ClassifiedAds.Application.WordCustoms.Commands
{
    public class DeleteWordCustomCommand : ICommand
    {
        public WordCustom WordCustom { get; set; }
    }

    internal class DeleteWordCustomCommandHandler : ICommandHandler<DeleteWordCustomCommand>
    {
        private readonly ICrudService<WordCustom> _wordCustomService;

        public DeleteWordCustomCommandHandler(ICrudService<WordCustom> wordCustomService)
        {
            _wordCustomService = wordCustomService;
        }

        public async Task HandleAsync(DeleteWordCustomCommand command, CancellationToken cancellationToken = default)
        {
            await _wordCustomService.DeleteAsync(command.WordCustom);
        }
    }
}
