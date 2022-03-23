using System;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class StockInsiderTransaction : AggregateRoot<Guid>
    {
        public string StockCode { get; set; }

        public DateTime Time { get; set; }

        public string Position { get; set; }

        public string FromName { get; set; }

        public string ToName { get; set; }

        public string Method { get; set; }

        public int CreditBefore { get; set; }

        public int CreditAfter { get; set; }

        public int OwnBefore { get; set; }

        public int OwnAfter { get; set; }

        public string During { get; set; }

        public virtual Stock StockCodeNavigation { get; set; }
    }
}
