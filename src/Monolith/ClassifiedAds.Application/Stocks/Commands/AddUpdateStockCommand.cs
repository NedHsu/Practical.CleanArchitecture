using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Stocks.Commands
{
    public class AddUpdateStockCommand : ICommand
    {
        public stock Stock { get; set; }
    }

    internal class AddUpdateStockCommandHandler : ICommandHandler<AddUpdateStockCommand>
    {
        private readonly IDapperCrudService<stock> _stockService;

        public AddUpdateStockCommandHandler(IDapperCrudService<stock> stockService)
        {
            _stockService = stockService;
        }

        public void Handle(AddUpdateStockCommand command)
        {
            _stockService.AddOrUpdate(command.Stock);
        }
    }
}
