﻿using System;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockNew : AggregateRoot<Guid>
    {
        public string StockCode { get; set; }

        public DateTime Time { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Provider { get; set; }

        public virtual Stock StockCodeNavigation { get; set; }
    }
}
