using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockMargins.Commands
{
    public class DeleteStockMarginCommand : ICommand
    {
        public StockMargin StockMargin { get; set; }
    }

    internal class DeleteStockMarginCommandHandler : ICommandHandler<DeleteStockMarginCommand>
    {
        private readonly IDapperCrudService<StockMargin> _stockmarginService;

        public DeleteStockMarginCommandHandler(IDapperCrudService<StockMargin> stockmarginService)
        {
            _stockmarginService = stockmarginService;
        }

        public void Handle(DeleteStockMarginCommand command)
        {
            _stockmarginService.Delete(command.StockMargin);
        }
    }
}
