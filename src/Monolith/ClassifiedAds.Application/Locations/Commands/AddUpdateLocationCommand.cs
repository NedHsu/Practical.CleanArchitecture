using ClassifiedAds.Domain.Entities;

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

        public void Handle(AddUpdateLocationCommand command)
        {
            _locationService.AddOrUpdate(command.Location);
        }
    }
}
