using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.StockDays.Commands
{
    public class AddUpdateStockDayCommand : ICommand
    {
        public StockDay StockDay { get; set; }
    }

    internal class AddUpdateStockDayCommandHandler : ICommandHandler<AddUpdateStockDayCommand>
    {
        private readonly IDapperCrudService<StockDay> _stockdayService;

        public AddUpdateStockDayCommandHandler(IDapperCrudService<StockDay> stockdayService)
        {
            _stockdayService = stockdayService;
        }

        public async Task HandleAsync(AddUpdateStockDayCommand command, CancellationToken cancellationToken = default)
        {
            await _stockdayService.AddOrUpdateAsync(command.StockDay);
        }
    }
}
