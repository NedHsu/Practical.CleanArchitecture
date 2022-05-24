namespace ClassifiedAds.Application.WordStatss.Commands
{
    public class AddUpdateWordStatsCommand : ICommand
    {
        public WordStats WordStats { get; set; }
    }

    internal class AddUpdateWordStatsCommandHandler : ICommandHandler<AddUpdateWordStatsCommand>
    {
        private readonly IDapperCrudService<WordStats> _wordStatService;

        public AddUpdateWordStatsCommandHandler(IDapperCrudService<WordStats> wordStatService)
        {
            _wordStatService = wordStatService;
        }

        public async Task HandleAsync(AddUpdateWordStatsCommand command, CancellationToken cancellationToken = default)
        {
            await _wordStatService.AddOrUpdateAsync(command.WordStats);
        }
    }
}
