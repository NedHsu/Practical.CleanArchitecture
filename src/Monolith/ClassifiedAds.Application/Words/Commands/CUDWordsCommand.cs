using System.Collections.Generic;

namespace ClassifiedAds.Application.Words.Commands
{
    public class CUDWordsCommand : ICommand
    {
        public List<Word> Words { get; set; }
    }

    internal class CUDWordsCommandHandler : ICommandHandler<CUDWordsCommand>
    {
        private readonly IDapperCrudService<Word> _wordService;

        public CUDWordsCommandHandler(IDapperCrudService<Word> wordService)
        {
            _wordService = wordService;
        }

        public async Task HandleAsync(CUDWordsCommand command, CancellationToken cancellationToken = default)
        {
            await _wordService.CUDAsync(command.Words);
        }
    }
}
