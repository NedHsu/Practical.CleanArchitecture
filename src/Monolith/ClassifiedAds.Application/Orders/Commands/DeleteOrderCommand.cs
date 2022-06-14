namespace ClassifiedAds.Application.Orders.Commands
{
    public class DeleteOrderCommand : ICommand
    {
        public Order Order { get; set; }
    }

    internal class DeleteOrderCommandHandler : ICommandHandler<DeleteOrderCommand>
    {
        private readonly IDapperCrudService<Order> _orderService;

        public DeleteOrderCommandHandler(IDapperCrudService<Order> orderService)
        {
            _orderService = orderService;
        }

        public async Task HandleAsync(DeleteOrderCommand command, CancellationToken cancellationToken = default)
        {
            await _orderService.DeleteAsync(command.Order);
        }
    }
}
