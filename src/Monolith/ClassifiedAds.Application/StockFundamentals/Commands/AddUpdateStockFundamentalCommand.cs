namespace ClassifiedAds.Application.StockFundamentals.Commands
{
    public class AddUpdateStockFundamentalCommand : ICommand
    {
        public StockFundamental StockFundamental { get; set; }
    }

    internal class AddUpdateStockFundamentalCommandHandler : ICommandHandler<AddUpdateStockFundamentalCommand>
    {
        private readonly IDapperCrudService<StockFundamental> _stockfundamentalService;

        public AddUpdateStockFundamentalCommandHandler(IDapperCrudService<StockFundamental> stockfundamentalService)
        {
            _stockfundamentalService = stockfundamentalService;
        }

        public async Task HandleAsync(AddUpdateStockFundamentalCommand command, CancellationToken cancellationToken = default)
        {
            await _stockfundamentalService.AddOrUpdateAsync(command.StockFundamental);
        }
    }
}
