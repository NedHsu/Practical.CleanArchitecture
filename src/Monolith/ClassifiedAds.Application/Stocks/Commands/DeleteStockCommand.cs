using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Stocks.Commands
{
    public class DeleteStockCommand : ICommand
    {
        public Stock Stock { get; set; }
    }

    internal class DeleteStockCommandHandler : ICommandHandler<DeleteStockCommand>
    {
        private readonly IDapperCrudService<Stock> _stockService;

        public DeleteStockCommandHandler(IDapperCrudService<Stock> stockService)
        {
            _stockService = stockService;
        }

        public void Handle(DeleteStockCommand command)
        {
            _stockService.Delete(command.Stock);
        }
    }
}
