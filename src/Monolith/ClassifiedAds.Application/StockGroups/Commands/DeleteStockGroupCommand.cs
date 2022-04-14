using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockGroups.Commands
{
    public class DeleteStockGroupCommand : ICommand
    {
        public StockGroup StockGroup { get; set; }
    }

    internal class DeleteStockGroupCommandHandler : ICommandHandler<DeleteStockGroupCommand>
    {
        private readonly IDapperCrudService<StockGroup> _stockgroupService;

        public DeleteStockGroupCommandHandler(IDapperCrudService<StockGroup> stockgroupService)
        {
            _stockgroupService = stockgroupService;
        }

        public async Task HandleAsync(DeleteStockGroupCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupService.DeleteAsync(command.StockGroup);
        }
    }
}
