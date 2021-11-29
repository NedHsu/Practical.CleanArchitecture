using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockNews.Commands
{
    public class DeleteStockNewCommand : ICommand
    {
        public StockNew StockNew { get; set; }
    }

    internal class DeleteStockNewCommandHandler : ICommandHandler<DeleteStockNewCommand>
    {
        private readonly IDapperCrudService<StockNew> _stockNewService;

        public DeleteStockNewCommandHandler(IDapperCrudService<StockNew> stockNewService)
        {
            _stockNewService = stockNewService;
        }

        public void Handle(DeleteStockNewCommand command)
        {
            _stockNewService.Delete(command.StockNew);
        }
    }
}
