using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockGroupItems.Commands
{
    public class DeleteStockGroupItemCommand : ICommand
    {
        public StockGroupItem StockGroupItem { get; set; }
    }

    internal class DeleteStockGroupItemCommandHandler : ICommandHandler<DeleteStockGroupItemCommand>
    {
        private readonly IDapperCrudService<StockGroupItem> _stockgroupitemService;

        public DeleteStockGroupItemCommandHandler(IDapperCrudService<StockGroupItem> stockgroupitemService)
        {
            _stockgroupitemService = stockgroupitemService;
        }

        public async Task HandleAsync(DeleteStockGroupItemCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupitemService.DeleteAsync(command.StockGroupItem);
        }
    }
}
