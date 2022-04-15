namespace ClassifiedAds.Application.StockRevenues.Commands
{
    public class DeleteStockRevenueCommand : ICommand
    {
        public StockRevenue StockRevenue { get; set; }
    }

    internal class DeleteStockRevenueCommandHandler : ICommandHandler<DeleteStockRevenueCommand>
    {
        private readonly IDapperCrudService<StockRevenue> _stockrevenueService;

        public DeleteStockRevenueCommandHandler(IDapperCrudService<StockRevenue> stockrevenueService)
        {
            _stockrevenueService = stockrevenueService;
        }

        public async Task HandleAsync(DeleteStockRevenueCommand command, CancellationToken cancellationToken = default)
        {
            await _stockrevenueService.DeleteAsync(command.StockRevenue);
        }
    }
}
