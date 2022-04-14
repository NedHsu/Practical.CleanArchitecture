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

        public async Task HandleAsync(DeleteStockEPSCommand command, CancellationToken cancellationToken = default)
        {
            await _stockEpService.DeleteAsync(command.StockEPS);
        }
    }
}
