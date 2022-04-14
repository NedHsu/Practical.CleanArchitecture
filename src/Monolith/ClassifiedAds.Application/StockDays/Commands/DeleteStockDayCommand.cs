using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockDays.Commands
{
    public class DeleteStockDayCommand : ICommand
    {
        public StockDay StockDay { get; set; }
    }

    internal class DeleteStockDayCommandHandler : ICommandHandler<DeleteStockDayCommand>
    {
        private readonly IDapperCrudService<StockDay> _stockdayService;

        public DeleteStockDayCommandHandler(IDapperCrudService<StockDay> stockdayService)
        {
            _stockdayService = stockdayService;
        }

        public async Task HandleAsync(DeleteStockDayCommand command, CancellationToken cancellationToken = default)
        {
            await _stockdayService.DeleteAsync(command.StockDay);
        }
    }
}
