using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ClassifiedAds.Domain.Entities
{
    public partial class stock_funder
    {
        [Key]
        public string stock_code { get; set; }
        [Key]
        public DateTime date { get; set; }
        public int foreign_buy { get; set; }
        public int foreign_sell { get; set; }
        public int foreign_sum { get; set; }
        public int foreign_self_buy { get; set; }
        public int foreign_self_sell { get; set; }
        public int foreign_self_sum { get; set; }
        public int credit_buy { get; set; }
        public int credit_sell { get; set; }
        public int credit_sum { get; set; }
        public int self_buy_sell { get; set; }
        public int self_buy { get; set; }
        public int self_sell { get; set; }
        public int self_sum { get; set; }
        public int self_hedging_buy { get; set; }
        public int self_hedging_sell { get; set; }
        public int self_hedging_sum { get; set; }
        public int total { get; set; }
    }
}
