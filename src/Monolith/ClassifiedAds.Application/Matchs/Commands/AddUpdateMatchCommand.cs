using ClassifiedAds.Domain.Entities;

namespace ClassifiedAds.Application.Matchs.Commands
{
    public class AddUpdateMatchCommand : ICommand
    {
        public Match Match { get; set; }
    }

    internal class AddUpdateMatchCommandHandler : ICommandHandler<AddUpdateMatchCommand>
    {
        private readonly ICrudService<Match> _matchService;

        public AddUpdateMatchCommandHandler(ICrudService<Match> matchService)
        {
            _matchService = matchService;
        }

        public void Handle(AddUpdateMatchCommand command)
        {
            _matchService.AddOrUpdate(command.Match);
        }
    }
}
