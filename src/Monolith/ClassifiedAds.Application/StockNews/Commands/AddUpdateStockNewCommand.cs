using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockNews.Commands
{
    public class AddUpdateStockNewCommand : ICommand
    {
        public StockNew StockNew { get; set; }
    }

    internal class AddUpdateStockNewCommandHandler : ICommandHandler<AddUpdateStockNewCommand>
    {
        private readonly IDapperCrudService<StockNew> _stockNewService;

        public AddUpdateStockNewCommandHandler(IDapperCrudService<StockNew> stockNewService)
        {
            _stockNewService = stockNewService;
        }

        public void Handle(AddUpdateStockNewCommand command)
        {
            _stockNewService.AddOrUpdate(command.StockNew);
        }
    }
}
