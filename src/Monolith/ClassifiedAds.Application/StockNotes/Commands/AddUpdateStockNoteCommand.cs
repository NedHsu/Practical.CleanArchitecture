using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockNotes.Commands
{
    public class AddUpdateStockNoteCommand : ICommand
    {
        public StockNote StockNote { get; set; }
    }

    internal class AddUpdateStockNoteCommandHandler : ICommandHandler<AddUpdateStockNoteCommand>
    {
        private readonly IDapperCrudService<StockNote> _stocknoteService;

        public AddUpdateStockNoteCommandHandler(IDapperCrudService<StockNote> stocknoteService)
        {
            _stocknoteService = stocknoteService;
        }

        public void Handle(AddUpdateStockNoteCommand command)
        {
            _stocknoteService.AddOrUpdate(command.StockNote);
        }
    }
}
