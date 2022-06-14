using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IOrderRepository : IRepository<Order, Guid>
    {
        Task<Order> GetOrder(Guid orderId);
    }
}
