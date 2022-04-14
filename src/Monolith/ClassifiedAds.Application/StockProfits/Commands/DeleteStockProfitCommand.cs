using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockProfits.Commands
{
    public class DeleteStockProfitCommand : ICommand
    {
        public StockProfit StockProfit { get; set; }
    }

    internal class DeleteStockProfitCommandHandler : ICommandHandler<DeleteStockProfitCommand>
    {
        private readonly IDapperCrudService<StockProfit> _stockprofitService;

        public DeleteStockProfitCommandHandler(IDapperCrudService<StockProfit> stockprofitService)
        {
            _stockprofitService = stockprofitService;
        }

        public async Task HandleAsync(DeleteStockProfitCommand command, CancellationToken cancellationToken = default)
        {
            await _stockprofitService.DeleteAsync(command.StockProfit);
        }
    }
}
