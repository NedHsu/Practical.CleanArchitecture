using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Stocks.Commands
{
    public class AddUpdateStockCommand : ICommand
    {
        public Stock Stock { get; set; }
    }

    internal class AddUpdateStockCommandHandler : ICommandHandler<AddUpdateStockCommand>
    {
        private readonly IDapperCrudService<Stock> _stockService;

        public AddUpdateStockCommandHandler(IDapperCrudService<Stock> stockService)
        {
            _stockService = stockService;
        }

        public void Handle(AddUpdateStockCommand command)
        {
            _stockService.AddOrUpdate(command.Stock);
        }
    }
}
