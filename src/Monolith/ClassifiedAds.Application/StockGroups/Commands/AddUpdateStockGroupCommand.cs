using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.StockGroups.Commands
{
    public class AddUpdateStockGroupCommand : ICommand
    {
        public StockGroup StockGroup { get; set; }
    }

    internal class AddUpdateStockGroupCommandHandler : ICommandHandler<AddUpdateStockGroupCommand>
    {
        private readonly IDapperCrudService<StockGroup> _stockgroupService;

        public AddUpdateStockGroupCommandHandler(IDapperCrudService<StockGroup> stockgroupService)
        {
            _stockgroupService = stockgroupService;
        }

        public async Task HandleAsync(AddUpdateStockGroupCommand command, CancellationToken cancellationToken = default)
        {
            await _stockgroupService.AddOrUpdateAsync(command.StockGroup);
        }
    }
}
