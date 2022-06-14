using ClassifiedAds.Domain.Entities;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Identity;
using ClassifiedAds.Domain.Repositories;
using System;

namespace ClassifiedAds.Application.Services
{
    public class OrderService : DapperCrudService<Order>, IOrderService
    {
        public OrderService(IBaseDapperRepository<Order> orderRepository, IDomainEvents domainEvents, ICurrentUser currentUser)
            : base(orderRepository, domainEvents)
        {
        }
    }
}
