using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateStockGroupCommand command)
        {
            _stockgroupService.AddOrUpdate(command.StockGroup);
        }
    }
}
