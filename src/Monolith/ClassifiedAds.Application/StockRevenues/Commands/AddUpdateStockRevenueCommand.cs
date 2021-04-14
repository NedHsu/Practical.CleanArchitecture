using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockRevenues.Commands
{
    public class AddUpdateStockRevenueCommand : ICommand
    {
        public StockRevenue StockRevenue { get; set; }
    }

    internal class AddUpdateStockRevenueCommandHandler : ICommandHandler<AddUpdateStockRevenueCommand>
    {
        private readonly IDapperCrudService<StockRevenue> _stockrevenueService;

        public AddUpdateStockRevenueCommandHandler(IDapperCrudService<StockRevenue> stockrevenueService)
        {
            _stockrevenueService = stockrevenueService;
        }

        public void Handle(AddUpdateStockRevenueCommand command)
        {
            _stockrevenueService.AddOrUpdate(command.StockRevenue);
        }
    }
}
