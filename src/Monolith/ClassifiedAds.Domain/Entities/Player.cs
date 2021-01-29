using System;

namespace ClassifiedAds.Domain.Entities {
    public class Player : AggregateRoot<Guid> {
        public string Name { get; set; }

        public int Gender { get; set; }

        public int Age { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}