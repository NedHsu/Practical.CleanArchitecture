using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.StockGroupItems.Commands
{
    public class AddUpdateStockGroupItemCommand : ICommand
    {
        public StockGroupItem StockGroupItem { get; set; }
    }

    internal class AddUpdateStockGroupItemCommandHandler : ICommandHandler<AddUpdateStockGroupItemCommand>
    {
        private readonly IDapperCrudService<StockGroupItem> _stockgroupitemService;

        public AddUpdateStockGroupItemCommandHandler(IDapperCrudService<StockGroupItem> stockgroupitemService)
        {
            _stockgroupitemService = stockgroupitemService;
        }

        public async Task HandleAsync(AddUpdateStockGroupItemCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupitemService.AddOrUpdateAsync(command.StockGroupItem);
        }
    }
}
