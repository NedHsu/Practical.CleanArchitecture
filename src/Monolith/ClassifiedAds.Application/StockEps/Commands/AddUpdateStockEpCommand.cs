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

        public async Task HandleAsync(AddUpdateStockEPSCommand command, CancellationToken cancellationToken = default)
        {
            await _stockEpService.AddOrUpdateAsync(command.StockEPS);
        }
    }
}
