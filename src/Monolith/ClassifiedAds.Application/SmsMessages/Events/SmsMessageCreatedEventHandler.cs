using ClassifiedAds.Application.SmsMessages.DTOs;
using ClassifiedAds.Domain.Events;
using ClassifiedAds.Domain.Infrastructure.MessageBrokers;

namespace ClassifiedAds.Application.SmsMessages.Events
{
    public class SmsMessageCreatedEventHandler : IDomainEventHandler<EntityCreatedEvent<SmsMessage>>
    {
        private readonly IMessageSender<SmsMessageCreatedEvent> _smsMessageCreatedEventSender;

        public SmsMessageCreatedEventHandler(IMessageSender<SmsMessageCreatedEvent> smsMessageCreatedEventSender)
        {
            _smsMessageCreatedEventSender = smsMessageCreatedEventSender;
        }

        public async Task HandleAsync(EntityCreatedEvent<SmsMessage> domainEvent, CancellationToken cancellationToken = default)
        {
            // Handle the event here and we can also forward to external systems
            await _smsMessageCreatedEventSender.SendAsync(new SmsMessageCreatedEvent { Id = domainEvent.Entity.Id });
        }
    }
}
