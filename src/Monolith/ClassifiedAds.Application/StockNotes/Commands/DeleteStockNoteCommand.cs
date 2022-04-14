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

        public async Task HandleAsync(DeleteStockNoteCommand command, CancellationToken cancellationToken = default)
        {
            await _stocknoteService.DeleteAsync(command.StockNote);
        }
    }
}
