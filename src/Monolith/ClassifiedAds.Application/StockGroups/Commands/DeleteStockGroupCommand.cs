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

        public void Handle(DeleteStockGroupCommand command)
        {
            _stockgroupService.Delete(command.StockGroup);
        }
    }
}
