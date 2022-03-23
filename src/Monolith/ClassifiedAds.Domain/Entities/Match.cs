using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities
{
    public class Match : AggregateRoot<Guid>
    {
        public DateTime Time { get; set; }

        public string Title { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Guid CreaterId { get; set; }
        public User Creater { get; set; }

        public int? MatchTypeId { get; set; }
        public MatchType MatchType { get; set; }

        public Guid? LocationId { get; set; }
        public Location Location { get; set; }

        public IList<MatchPlayer> Players { get; set; }
    }
}