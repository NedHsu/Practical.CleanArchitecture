namespace ClassifiedAds.Application.Locations.Commands
{
    public class DeleteLocationCommand : ICommand
    {
        public Location Location { get; set; }
    }

    internal class DeleteLocationCommandHandler : ICommandHandler<DeleteLocationCommand>
    {
        private readonly ICrudService<Location> _locationService;

        public DeleteLocationCommandHandler(ICrudService<Location> locationService)
        {
            _locationService = locationService;
        }

        public async Task HandleAsync(DeleteLocationCommand command, CancellationToken cancellationToken = default)
        {
            await _locationService.DeleteAsync(command.Location);
        }
    }
}
