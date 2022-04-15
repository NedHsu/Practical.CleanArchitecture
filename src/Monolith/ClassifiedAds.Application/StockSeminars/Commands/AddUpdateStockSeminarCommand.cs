namespace ClassifiedAds.Application.StockSeminars.Commands
{
    public class AddUpdateStockSeminarCommand : ICommand
    {
        public StockSeminar StockSeminar { get; set; }
    }

    internal class AddUpdateStockSeminarCommandHandler : ICommandHandler<AddUpdateStockSeminarCommand>
    {
        private readonly IDapperCrudService<StockSeminar> _stockseminarService;

        public AddUpdateStockSeminarCommandHandler(IDapperCrudService<StockSeminar> stockseminarService)
        {
            _stockseminarService = stockseminarService;
        }

        public async Task HandleAsync(AddUpdateStockSeminarCommand command, CancellationToken cancellationToken = default)
        {
            await _stockseminarService.AddOrUpdateAsync(command.StockSeminar);
        }
    }
}
