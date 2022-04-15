using System;

namespace ClassifiedAds.Domain.Repositories
{
    public interface IEmailMessageRepository : IRepository<EmailMessage, Guid>
    {
    }
}
