using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockSeminars.Commands
{
    public class AddUpdateStockSeminarCommand : ICommand
    {
        public StockSeminar StockSeminar { get; set; }
    }

    internal class AddUpdateStockSeminarCommandHandler : ICommandHandler<AddUpdateStockSeminarCommand>
    {
        private readonly IDapperCrudService<StockSeminar> _stockseminarService;

        public AddUpdateStockSeminarCommandHandler(IDapperCrudService<StockSeminar> stockseminarService)
        {
            _stockseminarService = stockseminarService;
        }

        public void Handle(AddUpdateStockSeminarCommand command)
        {
            _stockseminarService.AddOrUpdate(command.StockSeminar);
        }
    }
}
