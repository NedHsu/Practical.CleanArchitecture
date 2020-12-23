﻿using System;
using System.Collections.Generic;

namespace ClassifiedAds.Domain.Entities {
    public class Match : AggregateRoot<Guid> {
        public DateTime Time { get; set; }

        public string Title { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Location Location { get; set; }

        public IList<MatchPlayer> Players { get; set; }
    }
}