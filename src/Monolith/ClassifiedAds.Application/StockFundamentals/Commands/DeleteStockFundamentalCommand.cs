namespace ClassifiedAds.Application.StockFundamentals.Commands
{
    public class DeleteStockFundamentalCommand : ICommand
    {
        public StockFundamental StockFundamental { get; set; }
    }

    internal class DeleteStockFundamentalCommandHandler : ICommandHandler<DeleteStockFundamentalCommand>
    {
        private readonly IDapperCrudService<StockFundamental> _stockfundamentalService;

        public DeleteStockFundamentalCommandHandler(IDapperCrudService<StockFundamental> stockfundamentalService)
        {
            _stockfundamentalService = stockfundamentalService;
        }

        public async Task HandleAsync(DeleteStockFundamentalCommand command, CancellationToken cancellationToken = default)
        {
            await _stockfundamentalService.DeleteAsync(command.StockFundamental);
        }
    }
}
