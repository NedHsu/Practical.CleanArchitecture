using ClassifiedAds.Domain.Entities;
using System.Threading;

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

        public async Task HandleAsync(AddUpdateStockCommand command, CancellationToken cancellationToken = default)
        {
            await _stockService.AddOrUpdateAsync(command.Stock);
        }
    }
}
