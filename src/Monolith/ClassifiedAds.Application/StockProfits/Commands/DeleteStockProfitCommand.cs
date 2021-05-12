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

        public void Handle(DeleteStockProfitCommand command)
        {
            _stockprofitService.Delete(command.StockProfit);
        }
    }
}
