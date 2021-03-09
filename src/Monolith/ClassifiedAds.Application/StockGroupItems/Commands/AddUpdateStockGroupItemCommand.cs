using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateStockGroupItemCommand command)
        {
            _stockgroupitemService.AddOrUpdate(command.StockGroupItem);
        }
    }
}
