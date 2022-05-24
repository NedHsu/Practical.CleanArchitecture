namespace ClassifiedAds.Application.WordStatss.Commands
{
    public class DeleteWordStatsCommand : ICommand
    {
        public WordStats WordStats { get; set; }
    }

    internal class DeleteWordStatsCommandHandler : ICommandHandler<DeleteWordStatsCommand>
    {
        private readonly IDapperCrudService<WordStats> _wordStatService;

        public DeleteWordStatsCommandHandler(IDapperCrudService<WordStats> wordStatService)
        {
            _wordStatService = wordStatService;
        }

        public async Task HandleAsync(DeleteWordStatsCommand command, CancellationToken cancellationToken = default)
        {
            await _wordStatService.DeleteAsync(command.WordStats);
        }
    }
}
