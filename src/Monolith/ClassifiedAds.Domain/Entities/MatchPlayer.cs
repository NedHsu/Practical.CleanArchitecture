using System.Runtime.InteropServices;
using System;

namespace ClassifiedAds.Domain.Entities {
    public class MatchPlayer : Entity<Guid> {

        public Guid MatchId { get; set; }
        public Match Match { get; set; }
        public Guid PlayerId { get; set; }
        public Player Player { get; set; }
    }
}