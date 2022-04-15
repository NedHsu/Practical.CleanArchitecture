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

        public async Task HandleAsync(AddUpdateStockNoteCommand command, CancellationToken cancellationToken = default)
        {
            await _stocknoteService.AddOrUpdateAsync(command.StockNote);
        }
    }
}
