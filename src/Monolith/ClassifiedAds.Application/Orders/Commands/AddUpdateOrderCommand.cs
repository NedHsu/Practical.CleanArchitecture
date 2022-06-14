namespace ClassifiedAds.Application.Orders.Commands
{
    public class AddUpdateOrderCommand : ICommand
    {
        public Order Order { get; set; }
    }

    internal class AddUpdateOrderCommandHandler : ICommandHandler<AddUpdateOrderCommand>
    {
        private readonly IDapperCrudService<Order> _orderService;

        public AddUpdateOrderCommandHandler(IDapperCrudService<Order> orderService)
        {
            _orderService = orderService;
        }

        public async Task HandleAsync(AddUpdateOrderCommand command, CancellationToken cancellationToken = default)
        {
            await _orderService.AddOrUpdateAsync(command.Order);
        }
    }
}
