using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockEPSs.Commands
{
    public class DeleteStockEPSCommand : ICommand
    {
        public StockEPS StockEPS { get; set; }
    }

    internal class DeleteStockEPSCommandHandler : ICommandHandler<DeleteStockEPSCommand>
    {
        private readonly IDapperCrudService<StockEPS> _stockEpService;

        public DeleteStockEPSCommandHandler(IDapperCrudService<StockEPS> stockEpService)
        {
            _stockEpService = stockEpService;
        }

        public void Handle(DeleteStockEPSCommand command)
        {
            _stockEpService.Delete(command.StockEPS);
        }
    }
}
