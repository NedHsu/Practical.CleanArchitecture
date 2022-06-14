using ClassifiedAds.Application.Decorators.AuditLog;
using ClassifiedAds.Application.Decorators.DatabaseRetry;
using ClassifiedAds.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ClassifiedAds.Application.Orders.Queries
{
    public class GetOrdersQuery : IQuery<List<Order>>
    {
    }

    [AuditLog]
    [DatabaseRetry]
    internal class GetOrdersQueryHandler : IQueryHandler<GetOrdersQuery, List<Order>>
    {
        private readonly IBaseDapperRepository<Order> _orderRepository;

        public GetOrdersQueryHandler(IBaseDapperRepository<Order> orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<List<Order>> HandleAsync(GetOrdersQuery query, CancellationToken cancellationToken = default)
        {
            return (await _orderRepository.GetAllAsync()).ToList();
        }
    }
}
