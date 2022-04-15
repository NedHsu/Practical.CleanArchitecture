namespace ClassifiedAds.Application.StockProfits.Commands
{
    public class AddUpdateStockProfitCommand : ICommand
    {
        public StockProfit StockProfit { get; set; }
    }

    internal class AddUpdateStockProfitCommandHandler : ICommandHandler<AddUpdateStockProfitCommand>
    {
        private readonly IDapperCrudService<StockProfit> _stockprofitService;

        public AddUpdateStockProfitCommandHandler(IDapperCrudService<StockProfit> stockprofitService)
        {
            _stockprofitService = stockprofitService;
        }

        public async Task HandleAsync(AddUpdateStockProfitCommand command, CancellationToken cancellationToken = default)
        {
            await _stockprofitService.AddOrUpdateAsync(command.StockProfit);
        }
    }
}
