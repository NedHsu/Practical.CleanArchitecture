using ClassifiedAds.Domain.Entities;
using System.Threading;

namespace ClassifiedAds.Application.Locations.Commands
{
    public class AddUpdateLocationCommand : ICommand
    {
        public Location Location { get; set; }
    }

    internal class AddUpdateLocationCommandHandler : ICommandHandler<AddUpdateLocationCommand>
    {
        private readonly ICrudService<Location> _locationService;

        public AddUpdateLocationCommandHandler(ICrudService<Location> locationService)
        {
            _locationService = locationService;
        }

        public async Task HandleAsync(AddUpdateLocationCommand command, CancellationToken cancellationToken = default)
        {
            await _locationService.AddOrUpdateAsync(command.Location);
        }
    }
}
