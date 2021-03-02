using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Stocks.Commands
{
    public class DeleteStockCommand : ICommand
    {
        public stock Stock { get; set; }
    }

    internal class DeleteStockCommandHandler : ICommandHandler<DeleteStockCommand>
    {
        private readonly IDapperCrudService<stock> _stockService;

        public DeleteStockCommandHandler(IDapperCrudService<stock> stockService)
        {
            _stockService = stockService;
        }

        public void Handle(DeleteStockCommand command)
        {
            _stockService.Delete(command.Stock);
        }
    }
}
