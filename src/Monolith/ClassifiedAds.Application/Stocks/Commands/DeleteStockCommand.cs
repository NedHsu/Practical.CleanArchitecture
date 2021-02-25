using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Stocks.Commands
{
    public class DeleteStockCommand : ICommand
    {
        public Stock Stock { get; set; }
    }

    internal class DeleteStockCommandHandler : ICommandHandler<DeleteStockCommand>
    {
        private readonly ICrudService<Stock> _stockService;

        public DeleteStockCommandHandler(ICrudService<Stock> stockService)
        {
            _stockService = stockService;
        }

        public void Handle(DeleteStockCommand command)
        {
            _stockService.Delete(command.Stock);
        }
    }
}
