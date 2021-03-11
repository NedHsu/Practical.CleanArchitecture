using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockFundamentals.Commands
{
    public class AddUpdateStockFundamentalCommand : ICommand
    {
        public StockFundamental StockFundamental { get; set; }
    }

    internal class AddUpdateStockFundamentalCommandHandler : ICommandHandler<AddUpdateStockFundamentalCommand>
    {
        private readonly IDapperCrudService<StockFundamental> _stockfundamentalService;

        public AddUpdateStockFundamentalCommandHandler(IDapperCrudService<StockFundamental> stockfundamentalService)
        {
            _stockfundamentalService = stockfundamentalService;
        }

        public void Handle(AddUpdateStockFundamentalCommand command)
        {
            _stockfundamentalService.AddOrUpdate(command.StockFundamental);
        }
    }
}
