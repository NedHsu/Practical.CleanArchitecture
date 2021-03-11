using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockFundamentals.Commands
{
    public class DeleteStockFundamentalCommand : ICommand
    {
        public StockFundamental StockFundamental { get; set; }
    }

    internal class DeleteStockFundamentalCommandHandler : ICommandHandler<DeleteStockFundamentalCommand>
    {
        private readonly IDapperCrudService<StockFundamental> _stockfundamentalService;

        public DeleteStockFundamentalCommandHandler(IDapperCrudService<StockFundamental> stockfundamentalService)
        {
            _stockfundamentalService = stockfundamentalService;
        }

        public void Handle(DeleteStockFundamentalCommand command)
        {
            _stockfundamentalService.Delete(command.StockFundamental);
        }
    }
}
