namespace ClassifiedAds.Application.StockMargins.Commands
{
    public class AddUpdateStockMarginCommand : ICommand
    {
        public StockMargin StockMargin { get; set; }
    }

    internal class AddUpdateStockMarginCommandHandler : ICommandHandler<AddUpdateStockMarginCommand>
    {
        private readonly IDapperCrudService<StockMargin> _stockmarginService;

        public AddUpdateStockMarginCommandHandler(IDapperCrudService<StockMargin> stockmarginService)
        {
            _stockmarginService = stockmarginService;
        }

        public async Task HandleAsync(AddUpdateStockMarginCommand command, CancellationToken cancellationToken = default)
        {
            await _stockmarginService.AddOrUpdateAsync(command.StockMargin);
        }
    }
}
