using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateStockDayCommand command)
        {
            _stockdayService.AddOrUpdate(command.StockDay);
        }
    }
}
