using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockEPSs.Commands
{
    public class AddUpdateStockEPSCommand : ICommand
    {
        public StockEPS StockEPS { get; set; }
    }

    internal class AddUpdateStockEPSCommandHandler : ICommandHandler<AddUpdateStockEPSCommand>
    {
        private readonly IDapperCrudService<StockEPS> _stockEpService;

        public AddUpdateStockEPSCommandHandler(IDapperCrudService<StockEPS> stockEpService)
        {
            _stockEpService = stockEpService;
        }

        public void Handle(AddUpdateStockEPSCommand command)
        {
            _stockEpService.AddOrUpdate(command.StockEPS);
        }
    }
}
