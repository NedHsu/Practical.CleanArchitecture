using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class stockDay
    {
        [Key]
        public string stock_code { get; set; }
        [Key]
        public DateTime date { get; set; }
        public long? deal_amount { get; set; }
        public long? deal_money { get; set; }
        public decimal? open_price { get; set; }
        public decimal? highest_price { get; set; }
        public decimal? lowest_price { get; set; }
        public decimal? close_price { get; set; }
        public int? deal_count { get; set; }

        public virtual stock stock_codeNavigation { get; set; }
    }
}
