using System;
using System.Collections.Generic;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class Stock
    {
        public Stock()
        {
            StockDays = new HashSet<StockDay>();
        }

        public string Ex { get; set; }
        public string Code { get; set; }
        public decimal? ClosePrice { get; set; }
        public decimal? FivePrice { get; set; }
        public decimal? TenPrice { get; set; }
        public decimal? TwentyPrice { get; set; }
        public decimal? SixtyPrice { get; set; }
        public DateTime? FetchDate { get; set; }
        public string Name { get; set; }
        public DateTime? ListingDate { get; set; }
        public string Industry { get; set; }
        public string Cficode { get; set; }
        public string Note { get; set; }
        public string Isincode { get; set; }

        public virtual ICollection<StockDay> StockDays { get; set; }
    }
}
