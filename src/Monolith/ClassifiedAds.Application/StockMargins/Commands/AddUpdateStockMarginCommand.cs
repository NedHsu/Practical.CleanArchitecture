using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockMargins.Commands
{
    public class AddUpdateStockMarginCommand : ICommand
    {
        public StockMargin StockMargin { get; set; }
    }

    internal class AddUpdateStockMarginCommandHandler : ICommandHandler<AddUpdateStockMarginCommand>
    {
        private readonly IDapperCrudService<StockMargin> _stockmarginService;

        public AddUpdateStockMarginCommandHandler(IDapperCrudService<StockMargin> stockmarginService)
        {
            _stockmarginService = stockmarginService;
        }

        public void Handle(AddUpdateStockMarginCommand command)
        {
            _stockmarginService.AddOrUpdate(command.StockMargin);
        }
    }
}
