using ClassifiedAds.Domain.Entities;
using System.Threading;

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

        public async Task HandleAsync(DeleteStockCommand command, CancellationToken cancellationToken = default)
        {
            await _stockService.DeleteAsync(command.Stock);
        }
    }
}
