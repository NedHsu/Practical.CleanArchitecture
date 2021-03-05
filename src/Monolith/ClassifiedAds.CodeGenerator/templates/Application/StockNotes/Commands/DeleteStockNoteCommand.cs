using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.StockNotes.Commands
{
    public class DeleteStockNoteCommand : ICommand
    {
        public StockNote StockNote { get; set; }
    }

    internal class DeleteStockNoteCommandHandler : ICommandHandler<DeleteStockNoteCommand>
    {
        private readonly IDapperCrudService<StockNote> _stocknoteService;

        public DeleteStockNoteCommandHandler(IDapperCrudService<StockNote> stocknoteService)
        {
            _stocknoteService = stocknoteService;
        }

        public void Handle(DeleteStockNoteCommand command)
        {
            _stocknoteService.Delete(command.StockNote);
        }
    }
}
