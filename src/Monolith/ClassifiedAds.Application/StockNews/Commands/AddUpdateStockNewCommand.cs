using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.StockNews.Commands
{
    public class AddUpdateStockNewCommand : ICommand
    {
        public StockNew StockNew { get; set; }
    }

    internal class AddUpdateStockNewCommandHandler : ICommandHandler<AddUpdateStockNewCommand>
    {
        private readonly IDapperCrudService<StockNew> _stockNewService;

        public AddUpdateStockNewCommandHandler(IDapperCrudService<StockNew> stockNewService)
        {
            _stockNewService = stockNewService;
        }

        public async Task HandleAsync(AddUpdateStockNewCommand command, CancellationToken cancellationToken = default)
        {
            await _stockNewService.AddOrUpdateAsync(command.StockNew);
        }
    }
}
