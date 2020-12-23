using System;

namespace ClassifiedAds.Domain.Entities {
    public class MatchPlayer : Entity<Guid> {

        public Match Match { get; set; }
        public Player Player { get; set; }
    }
}