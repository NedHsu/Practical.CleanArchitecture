using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateStockProfitCommand command)
        {
            _stockprofitService.AddOrUpdate(command.StockProfit);
        }
    }
}
