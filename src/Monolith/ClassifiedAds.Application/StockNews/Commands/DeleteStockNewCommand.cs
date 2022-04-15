namespace ClassifiedAds.Application.StockNews.Commands
{
    public class DeleteStockNewCommand : ICommand
    {
        public StockNew StockNew { get; set; }
    }

    internal class DeleteStockNewCommandHandler : ICommandHandler<DeleteStockNewCommand>
    {
        private readonly IDapperCrudService<StockNew> _stockNewService;

        public DeleteStockNewCommandHandler(IDapperCrudService<StockNew> stockNewService)
        {
            _stockNewService = stockNewService;
        }

        public async Task HandleAsync(DeleteStockNewCommand command, CancellationToken cancellationToken = default)
        {
            await _stockNewService.DeleteAsync(command.StockNew);
        }
    }
}
