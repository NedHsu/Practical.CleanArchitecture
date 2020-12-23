using System;

namespace ClassifiedAds.Domain.Entities
{
    public class MatchType : AggregateRoot<Guid>
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }
}
