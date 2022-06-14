using ClassifiedAds.CrossCuttingConcerns.Exceptions;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Linq;

namespace ClassifiedAds.Application.Orders.Queries
{
    public class GetOrderQuery : IQuery<Order>
    {
        public Guid Id { get; set; }
        public bool ThrowNotFoundIfNull { get; set; }
    }

    internal class GetOrderQueryHandler : IQueryHandler<GetOrderQuery, Order>
    {
        private readonly IOrderRepository _orderRepository;

        public GetOrderQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<Order> HandleAsync(GetOrderQuery query, CancellationToken cancellationToken = default)
        {
            var order = await _orderRepository.GetOrder(query.Id);

            if (query.ThrowNotFoundIfNull && order == null)
            {
                throw new NotFoundException($"Order {query.Id} not found.");
            }

            return order;
        }
    }
}
