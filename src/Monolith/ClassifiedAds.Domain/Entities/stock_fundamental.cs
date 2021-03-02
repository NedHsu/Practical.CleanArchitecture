using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class stock_fundamental
    {
        [Key]
        public string stock_code { get; set; }
        public string stock_name { get; set; }
        [Key]
        public DateTime date { get; set; }
        public decimal? yield_rate { get; set; }
        public int? dividend_year { get; set; }
        public decimal? pe_ratio { get; set; }
        public decimal? price_net_ratio { get; set; }
        public string report_year_quarter { get; set; }
        public DateTime? created { get; set; }
        public DateTime? updated { get; set; }
    }
}
