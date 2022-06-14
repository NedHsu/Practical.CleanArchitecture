using ClassifiedAds.CrossCuttingConcerns.OS;
using ClassifiedAds.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;

namespace ClassifiedAds.Persistence.Repositories
{
    public class OrderRepository : Repository<Order, Guid>, IOrderRepository
    {
        public OrderRepository(AdsDbContext dbContext, IDateTimeProvider dateTimeProvider)
            : base(dbContext, dateTimeProvider)
        {
        }

        public async Task<Order> GetOrder(Guid orderId)
        {
            return await FirstOrDefaultAsync(GetAll().Include(x => x.Items.Select(i => i.Product)).Where(x => x.Id == orderId));
        }
    }
}
